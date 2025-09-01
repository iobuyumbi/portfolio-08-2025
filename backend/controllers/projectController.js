/**
 * Projects Controller
 */

// Sample project data based on your CV and experience
const projects = [
  {
    id: "microfinance-mis",
    title: "Microfinance Management System",
    category: "development",
    meta: "Full-Stack Development • MERN Stack",
    description:
      "Enterprise MIS with loan workflows, customer tracking, analytics, and RBAC. Improved operational efficiency by 35% and reduced manual errors.",
    longDescription: `
      Developed a comprehensive microfinance management information system using the MERN stack. 
      The system includes loan application workflows, customer relationship management, 
      real-time analytics dashboard, and role-based access control (RBAC).
      
      Key achievements:
      • Improved operational efficiency by 35%
      • Reduced manual data entry errors by 90%
      • Streamlined loan approval process from 5 days to 2 days
      • Implemented automated reporting for regulatory compliance
    `,
    technologies: [
      "MongoDB",
      "Express.js",
      "React.js",
      "Node.js",
      "JWT",
      "Chart.js",
    ],
    tags: ["MongoDB", "Express", "React", "Node.js", "RBAC"],
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=400&fit=crop",
    date: "2024-08-15",
    featured: true,
    github: null,
    demo: null,
  },
  {
    id: "network-redesign",
    title: "Network Infrastructure Redesign",
    category: "networking",
    meta: "Network Engineering • Cisco & pfSense",
    description:
      "Complete LAN/WAN redesign with firewall rules, VPN setup, and redundancy planning. Achieved 99.9% uptime and significantly improved security posture.",
    longDescription: `
      Led a comprehensive network infrastructure redesign for SyncFusion Software Services. 
      The project involved redesigning the entire LAN/WAN architecture, implementing 
      robust security policies, and ensuring high availability.
      
      Key achievements:
      • Achieved 99.9% network uptime
      • Reduced network-related incidents by 80%
      • Implemented secure VPN access for remote workers
      • Configured pfSense firewall with advanced threat detection
    `,
    technologies: ["Cisco IOS", "pfSense", "VLAN", "VPN", "Network Monitoring"],
    tags: ["Cisco", "pfSense", "VLAN", "VPN"],
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop",
    date: "2023-12-10",
    featured: true,
    github: null,
    demo: null,
  },
  {
    id: "cloud-migration",
    title: "Cloud Migration & Hardening",
    category: "cloud",
    meta: "Cloud Engineering • Azure & AWS",
    description:
      "Lift-and-shift migration with IAM baselines, backup policies, and cost monitoring. Achieved 40% cost reduction while improving security posture.",
    longDescription: `
      Executed a comprehensive cloud migration strategy moving critical applications 
      from on-premises infrastructure to Azure and AWS. The project included security 
      hardening, cost optimization, and disaster recovery planning.
      
      Key achievements:
      • 40% reduction in infrastructure costs
      • Improved system reliability and scalability
      • Implemented automated backup and disaster recovery
      • Enhanced security with cloud-native tools
    `,
    technologies: [
      "Microsoft Azure",
      "AWS",
      "Terraform",
      "Docker",
      "Kubernetes",
    ],
    tags: ["Azure", "AWS", "Security", "Migration"],
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop",
    date: "2023-10-05",
    featured: true,
    github: null,
    demo: null,
  },
  {
    id: "automation-toolkit",
    title: "Automation Toolkit",
    category: "development",
    meta: "Development • Python & Bash",
    description:
      "Automated backups, alerts, and reports to reduce toil and incidents. Saved 15+ hours per week in manual operations tasks.",
    longDescription: `
      Developed a comprehensive automation toolkit using Python and Bash scripts 
      to streamline IT operations. The toolkit includes automated backup systems, 
      alert mechanisms, and reporting tools.
      
      Key achievements:
      • Saved 15+ hours per week in manual tasks
      • Reduced human errors in routine operations
      • Implemented proactive monitoring and alerting
      • Created automated reporting for management
    `,
    technologies: ["Python", "Bash", "Cron", "Systemd", "Monitoring Tools"],
    tags: ["Python", "Automation", "Bash", "Operations"],
    image:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop",
    date: "2023-08-20",
    featured: false,
    github: null,
    demo: null,
  },
  {
    id: "internal-apis",
    title: "API for Internal Services",
    category: "development",
    meta: "Backend Development • Node.js & Spring Boot",
    description:
      "Internal REST APIs with authentication, rate limiting, and observability hooks. Enabled integration between 5 previously siloed systems.",
    longDescription: `
      Designed and implemented REST APIs to connect previously siloed internal systems. 
      The APIs include robust authentication, rate limiting, comprehensive logging, 
      and monitoring capabilities.
      
      Key achievements:
      • Connected 5 disparate systems
      • Improved data consistency across platforms
      • Reduced manual data synchronization by 95%
      • Implemented comprehensive API monitoring and logging
    `,
    technologies: [
      "Node.js",
      "Express.js",
      "Spring Boot",
      "JWT",
      "Redis",
      "PostgreSQL",
    ],
    tags: ["Node.js", "Spring Boot", "REST API", "Integration"],
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop",
    date: "2023-06-15",
    featured: false,
    github: null,
    demo: null,
  },
];

/**
 * Get all projects
 */
exports.getAllProjects = (req, res) => {
  try {
    // Optional filtering by category
    const { category, featured } = req.query;

    let filteredProjects = [...projects];

    if (category && category !== "all") {
      filteredProjects = filteredProjects.filter(
        (project) => project.category === category
      );
    }

    if (featured === "true") {
      filteredProjects = filteredProjects.filter(
        (project) => project.featured === true
      );
    }

    // Sort by date (newest first) by default
    filteredProjects.sort((a, b) => new Date(b.date) - new Date(a.date));

    res.json({
      success: true,
      projects: filteredProjects,
      total: filteredProjects.length,
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching projects",
    });
  }
};

/**
 * Get specific project by ID
 */
exports.getProjectById = (req, res) => {
  try {
    const { id } = req.params;
    const project = projects.find((p) => p.id === id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.json({
      success: true,
      project,
    });
  } catch (error) {
    console.error("Error fetching project:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching project",
    });
  }
};
