const express = require('express');
const router = express.Router();

// GET /api/mitigation/strategies?level=extreme
router.get('/strategies', (req, res) => {
  const { level } = req.query;
  
  const strategies = {
    low: {
      personal: [
        "Stay hydrated with water throughout the day",
        "Wear light-colored, loose-fitting clothing",
        "Take regular breaks in shaded areas",
        "Use fans to improve air circulation",
        "Avoid strenuous activities during peak hours"
      ],
      community: [
        "Maintain existing green spaces",
        "Monitor local weather forecasts",
        "Check on neighbors periodically",
        "Support local tree planting initiatives"
      ],
      infrastructure: [
        "Maintain air conditioning systems",
        "Ensure proper ventilation in buildings",
        "Use light-colored roofing materials",
        "Install window coverings and blinds"
      ]
    },
    moderate: {
      personal: [
        "Increase water intake significantly",
        "Avoid prolonged outdoor activities",
        "Seek air-conditioned spaces during peak heat",
        "Use cooling towels on neck and wrists",
        "Wear sunscreen and protective clothing",
        "Take cool showers or baths"
      ],
      community: [
        "Open community cooling centers",
        "Organize neighborhood check-ins",
        "Distribute water and cooling supplies",
        "Create temporary shade structures",
        "Promote public awareness campaigns"
      ],
      infrastructure: [
        "Increase urban tree canopy coverage",
        "Install misting systems in public areas",
        "Use reflective pavements and surfaces",
        "Improve public transportation cooling",
        "Create green corridors and parks"
      ]
    },
    high: {
      personal: [
        "Limit outdoor activities to early morning or evening",
        "Stay in air-conditioned environments",
        "Use cooling vests or ice packs",
        "Monitor for heat illness symptoms",
        "Avoid alcohol and caffeinated beverages",
        "Eat light, cool meals"
      ],
      community: [
        "Activate heat emergency response plans",
        "Extend cooling center hours",
        "Provide transportation to cooling centers",
        "Increase welfare checks for vulnerable populations",
        "Coordinate with emergency services"
      ],
      infrastructure: [
        "Install green roofs and walls",
        "Create urban forests and shade structures",
        "Implement cool pavement technologies",
        "Enhance water feature installations",
        "Improve building energy efficiency"
      ]
    },
    extreme: {
      personal: [
        "Avoid all non-essential outdoor activities",
        "Stay in air-conditioned spaces at all times",
        "Use multiple cooling methods simultaneously",
        "Monitor health status continuously",
        "Have emergency contacts readily available",
        "Follow heat illness protocols"
      ],
      community: [
        "Implement emergency heat response protocols",
        "Activate all available cooling resources",
        "Coordinate with emergency medical services",
        "Provide emergency shelter and cooling",
        "Issue public health warnings",
        "Mobilize community volunteers"
      ],
      infrastructure: [
        "Deploy emergency cooling infrastructure",
        "Activate emergency power for cooling systems",
        "Implement traffic and activity restrictions",
        "Enhance hospital and healthcare capacity",
        "Activate emergency water distribution",
        "Coordinate regional cooling response"
      ]
    }
  };
  
  if (level && strategies[level]) {
    res.json({
      success: true,
      data: {
        riskLevel: level,
        strategies: strategies[level],
        timestamp: new Date().toISOString()
      }
    });
  } else {
    res.json({
      success: true,
      data: {
        allStrategies: strategies,
        timestamp: new Date().toISOString()
      }
    });
  }
});

// GET /api/mitigation/tips?category=personal&level=high
router.get('/tips', (req, res) => {
  const { category, level } = req.query;
  
  const tips = {
    personal: {
      immediate: [
        "Move to air-conditioned space immediately",
        "Apply cool water to pulse points",
        "Remove excess clothing",
        "Drink cool fluids slowly",
        "Use fans to increase air circulation"
      ],
      preventive: [
        "Stay hydrated throughout the day",
        "Wear light-colored, loose clothing",
        "Plan activities for cooler parts of day",
        "Use sunscreen and protective gear",
        "Take frequent breaks in shade"
      ],
      emergency: [
        "Call emergency services if experiencing heat illness",
        "Move to coolest available location",
        "Apply ice packs to neck, armpits, groin",
        "Monitor for signs of heat exhaustion",
        "Have someone stay with affected person"
      ]
    },
    community: {
      planning: [
        "Develop heat emergency response plans",
        "Identify vulnerable populations",
        "Establish cooling center locations",
        "Create communication networks",
        "Train community volunteers"
      ],
      implementation: [
        "Open cooling centers during heat events",
        "Conduct wellness checks on vulnerable residents",
        "Distribute cooling supplies and water",
        "Provide transportation to cooling centers",
        "Activate emergency communication systems"
      ],
      longterm: [
        "Increase urban tree canopy",
        "Install community cooling infrastructure",
        "Develop heat-resilient building codes",
        "Create public awareness programs",
        "Build community resilience networks"
      ]
    },
    infrastructure: {
      buildings: [
        "Install or upgrade air conditioning systems",
        "Improve building insulation",
        "Use reflective roofing materials",
        "Install window films and coverings",
        "Enhance natural ventilation"
      ],
      urban: [
        "Increase green space and tree coverage",
        "Install public cooling features",
        "Use cool pavement technologies",
        "Create shade structures",
        "Implement urban heat island mitigation"
      ],
      systems: [
        "Upgrade electrical grid for cooling demand",
        "Enhance water distribution systems",
        "Improve emergency response systems",
        "Develop heat warning systems",
        "Create resilient transportation networks"
      ]
    }
  };
  
  if (category && tips[category]) {
    res.json({
      success: true,
      data: {
        category,
        tips: tips[category],
        timestamp: new Date().toISOString()
      }
    });
  } else {
    res.json({
      success: true,
      data: {
        allTips: tips,
        timestamp: new Date().toISOString()
      }
    });
  }
});

// GET /api/mitigation/resources
router.get('/resources', (req, res) => {
  const resources = {
    emergency: {
      hotlines: [
        { name: "Emergency Services", number: "911", description: "For heat-related emergencies" },
        { name: "Heat Emergency Line", number: "311", description: "Non-emergency heat assistance" },
        { name: "Health Department", number: "1-800-HEALTH", description: "Heat illness guidance" }
      ],
      websites: [
        { name: "CDC Heat Safety", url: "https://www.cdc.gov/disasters/extremeheat", description: "Comprehensive heat safety information" },
        { name: "Weather.gov", url: "https://www.weather.gov/safety/heat", description: "Official weather alerts and safety" },
        { name: "Ready.gov", url: "https://www.ready.gov/heat", description: "Heat emergency preparedness" }
      ]
    },
    cooling: {
      centers: [
        { name: "Community Centers", description: "Public buildings with air conditioning" },
        { name: "Libraries", description: "Free access to cooling during business hours" },
        { name: "Shopping Centers", description: "Mall and retail cooling spaces" },
        { name: "Recreation Centers", description: "Public pools and cooling facilities" }
      ],
      supplies: [
        { item: "Cooling Towels", description: "Evaporative cooling for personal use" },
        { item: "Battery-powered Fans", description: "Portable cooling during power outages" },
        { item: "Ice Packs", description: "For immediate cooling relief" },
        { item: "Electrolyte Drinks", description: "For hydration and mineral replacement" }
      ]
    },
    prevention: {
      home: [
        { tip: "Seal air leaks", description: "Improve cooling efficiency" },
        { tip: "Use window treatments", description: "Block heat from entering" },
        { tip: "Install ceiling fans", description: "Improve air circulation" },
        { tip: "Plant shade trees", description: "Natural cooling around home" }
      ],
      technology: [
        { tool: "Smart thermostats", description: "Efficient temperature management" },
        { tool: "Weather apps", description: "Real-time heat alerts" },
        { tool: "UV monitors", description: "Track heat exposure" },
        { tool: "Hydration reminders", description: "Apps to maintain fluid intake" }
      ]
    }
  };
  
  res.json({
    success: true,
    data: {
      resources,
      timestamp: new Date().toISOString()
    }
  });
});

module.exports = router;