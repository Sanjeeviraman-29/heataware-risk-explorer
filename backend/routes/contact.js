const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Ensure data directory exists
const dataDir = path.join(__dirname, '../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const contactsFile = path.join(dataDir, 'contacts.json');
const feedbackFile = path.join(dataDir, 'feedback.json');

// Helper function to read JSON file
const readJSONFile = (filename) => {
  try {
    if (fs.existsSync(filename)) {
      const data = fs.readFileSync(filename, 'utf8');
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error('Error reading JSON file:', error);
    return [];
  }
};

// Helper function to write JSON file
const writeJSONFile = (filename, data) => {
  try {
    fs.writeFileSync(filename, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing JSON file:', error);
    return false;
  }
};

// POST /api/contact - Submit contact form
router.post('/', (req, res) => {
  try {
    const { name, email, subject, message, priority } = req.body;
    
    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        error: 'All fields are required (name, email, subject, message)' 
      });
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        error: 'Invalid email format' 
      });
    }
    
    // Create contact entry
    const contact = {
      id: Date.now().toString(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim(),
      priority: priority || 'normal',
      timestamp: new Date().toISOString(),
      status: 'new'
    };
    
    // Read existing contacts
    const contacts = readJSONFile(contactsFile);
    
    // Add new contact
    contacts.push(contact);
    
    // Write back to file
    const success = writeJSONFile(contactsFile, contacts);
    
    if (success) {
      res.json({
        success: true,
        message: 'Contact form submitted successfully',
        data: {
          id: contact.id,
          timestamp: contact.timestamp
        }
      });
    } else {
      res.status(500).json({ error: 'Failed to save contact information' });
    }
    
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/contact/feedback - Submit feedback form
router.post('/feedback', (req, res) => {
  try {
    const { name, email, rating, category, feedback, anonymous } = req.body;
    
    // Validate required fields
    if (!feedback || !category) {
      return res.status(400).json({ 
        error: 'Feedback and category are required' 
      });
    }
    
    // Validate email if provided
    if (email && !anonymous) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ 
          error: 'Invalid email format' 
        });
      }
    }
    
    // Create feedback entry
    const feedbackEntry = {
      id: Date.now().toString(),
      name: anonymous ? 'Anonymous' : (name || '').trim(),
      email: anonymous ? null : (email || '').trim().toLowerCase(),
      rating: rating || null,
      category: category.trim(),
      feedback: feedback.trim(),
      anonymous: anonymous || false,
      timestamp: new Date().toISOString(),
      status: 'new'
    };
    
    // Read existing feedback
    const feedbacks = readJSONFile(feedbackFile);
    
    // Add new feedback
    feedbacks.push(feedbackEntry);
    
    // Write back to file
    const success = writeJSONFile(feedbackFile, feedbacks);
    
    if (success) {
      res.json({
        success: true,
        message: 'Feedback submitted successfully',
        data: {
          id: feedbackEntry.id,
          timestamp: feedbackEntry.timestamp
        }
      });
    } else {
      res.status(500).json({ error: 'Failed to save feedback' });
    }
    
  } catch (error) {
    console.error('Feedback form error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/contact - Get all contacts (admin endpoint)
router.get('/', (req, res) => {
  try {
    const contacts = readJSONFile(contactsFile);
    res.json({
      success: true,
      data: {
        contacts: contacts.reverse(), // Most recent first
        total: contacts.length,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

// GET /api/contact/feedback - Get all feedback (admin endpoint)
router.get('/feedback', (req, res) => {
  try {
    const feedbacks = readJSONFile(feedbackFile);
    res.json({
      success: true,
      data: {
        feedbacks: feedbacks.reverse(), // Most recent first
        total: feedbacks.length,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({ error: 'Failed to fetch feedback' });
  }
});

// GET /api/contact/stats - Get contact statistics
router.get('/stats', (req, res) => {
  try {
    const contacts = readJSONFile(contactsFile);
    const feedbacks = readJSONFile(feedbackFile);
    
    // Calculate statistics
    const stats = {
      contacts: {
        total: contacts.length,
        new: contacts.filter(c => c.status === 'new').length,
        resolved: contacts.filter(c => c.status === 'resolved').length,
        priorities: {
          urgent: contacts.filter(c => c.priority === 'urgent').length,
          high: contacts.filter(c => c.priority === 'high').length,
          normal: contacts.filter(c => c.priority === 'normal').length,
          low: contacts.filter(c => c.priority === 'low').length
        }
      },
      feedback: {
        total: feedbacks.length,
        categories: {},
        ratings: {
          5: feedbacks.filter(f => f.rating === 5).length,
          4: feedbacks.filter(f => f.rating === 4).length,
          3: feedbacks.filter(f => f.rating === 3).length,
          2: feedbacks.filter(f => f.rating === 2).length,
          1: feedbacks.filter(f => f.rating === 1).length
        },
        anonymous: feedbacks.filter(f => f.anonymous).length
      }
    };
    
    // Calculate category statistics
    feedbacks.forEach(f => {
      if (f.category) {
        stats.feedback.categories[f.category] = (stats.feedback.categories[f.category] || 0) + 1;
      }
    });
    
    res.json({
      success: true,
      data: {
        stats,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

// PUT /api/contact/:id/status - Update contact status
router.put('/:id/status', (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!status || !['new', 'in-progress', 'resolved', 'closed'].includes(status)) {
      return res.status(400).json({ 
        error: 'Valid status is required (new, in-progress, resolved, closed)' 
      });
    }
    
    const contacts = readJSONFile(contactsFile);
    const contactIndex = contacts.findIndex(c => c.id === id);
    
    if (contactIndex === -1) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    
    contacts[contactIndex].status = status;
    contacts[contactIndex].updatedAt = new Date().toISOString();
    
    const success = writeJSONFile(contactsFile, contacts);
    
    if (success) {
      res.json({
        success: true,
        message: 'Contact status updated successfully',
        data: contacts[contactIndex]
      });
    } else {
      res.status(500).json({ error: 'Failed to update contact status' });
    }
    
  } catch (error) {
    console.error('Error updating contact status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;