import React from "react";

const TeamTechResources = () => {
  const teams = [
    {
      name: "Product Manager / Founder",
      responsibilities: [
        "Define MVP scope",
        "Prioritize features",
        "Coordinate team",
      ],
      tools: [],
    },
    {
      name: "Frontend Team",
      tools: ["React", "React Native"],
      responsibilities: [
        "Customer app",
        "Preferences form",
        "AI Waiter chat UI",
        "Chef dashboard UI",
      ],
    },
    {
      name: "Backend Team",
      tools: ["Node.js", "Express"],
      responsibilities: [
        "API for orders, profiles",
        "AI Waiter integration",
        "Payments (Stripe)",
        "Delivery API integration",
      ],
      database: ["PostgreSQL", "Firebase Firestore"],
    },
    {
      name: "AI/ML Engineer",
      tools: ["GPT API", "Python"],
      responsibilities: [
        "Chef + meal recommendation",
        "Learning from user ratings",
        "Discovery meal logic",
      ],
    },
    {
      name: "QA / Tester",
      responsibilities: [
        "Test customer app",
        "Test chef dashboard",
        "Test AI waiter suggestions",
        "Delivery & payment flows",
      ],
    },
    {
      name: "Operations Team",
      responsibilities: [
        "Recruit & manage chefs",
        "Manage delivery partners",
        "Handle licenses / health",
      ],
    },
    {
      name: "Marketing / Growth",
      responsibilities: [
        "Acquire pilot users",
        "Social media / landing",
        "Collect feedback",
      ],
    },
  ];

  const resources = [
    {
      feature: "Customer app onboarding & preferences",
      dependsOn: "Frontend + Backend + Database",
    },
    {
      feature: "AI Waiter recommendations",
      dependsOn: "Backend + AI/ML + Customer data + Chef menu data",
    },
    {
      feature: "Chef dashboard & menu management",
      dependsOn: "Frontend + Backend + Database",
    },
    {
      feature: "Meal ordering + payment",
      dependsOn: "Backend + Stripe + Frontend",
    },
    {
      feature: "Delivery tracking",
      dependsOn: "Backend + Delivery API + Frontend",
    },
    {
      feature: "Feedback / learning",
      dependsOn: "AI/ML + Backend + Database",
    },
  ];

  return (
    <div style={{ padding: '2rem', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem', textAlign: 'center' }}>
        Team + Tech + Resources Blueprint
      </h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {teams.map((team, idx) => (
          <div
            key={idx}
            style={{
              borderLeft: '4px solid #3b82f6',
              backgroundColor: 'white',
              padding: '1.5rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              borderRadius: '0.5rem'
            }}
          >
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>{team.name}</h2>
            {team.tools && team.tools.length > 0 && (
              <p style={{ marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: '600' }}>Tools:</span>{" "}
                {team.tools.join(", ")}
              </p>
            )}
            {team.database && team.database.length > 0 && (
              <p style={{ marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: '600' }}>Database:</span>{" "}
                {team.database.join(", ")}
              </p>
            )}
            <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem' }}>
              {team.responsibilities.map((resp, i) => (
                <li key={i}>{resp}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '3rem', marginBottom: '1rem' }}>Resource Dependencies</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
        {resources.map((res, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: 'white',
              padding: '1.5rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              borderRadius: '0.5rem',
              borderLeft: '4px solid #10b981'
            }}
          >
            <p>
              <span style={{ fontWeight: '600' }}>Feature / Flow:</span>{" "}
              {res.feature}
            </p>
            <p>
              <span style={{ fontWeight: '600' }}>Depends On:</span> {res.dependsOn}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamTechResources;