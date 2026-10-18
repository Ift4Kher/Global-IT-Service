const { pool } = require('../config/db');

// Fallback services in case of database unavailability
const FALLBACK_SERVICES = [
  {
    id: 1,
    title: 'Managed Services',
    slug: 'managed-services',
    description: 'Proactive monitoring, management and support for your IT infrastructure.',
    detailed_content: 'Global IT ensures your systems are properly maintained at a mutually agreed upon SLA. Our managed IT services deliver 24/7/365 proactive monitoring, prompt patch deployment, network security management, automated backups, and dedicated technical helpdesk support to eliminate costly downtime.',
    image_path: '/assets/images/managed-services.webp',
    icon_name: 'server',
    display_order: 1,
    is_published: 1
  },
  {
    id: 2,
    title: 'Cloud Services',
    slug: 'cloud-services',
    description: 'Flexible, scalable and secure cloud solutions for modern businesses.',
    detailed_content: 'Global IT provides leading cloud migration and architecture services to empower your workforce. From hybrid cloud deployments and Microsoft 365 migrations to high-availability multi-region cloud infrastructures, we scale computing power efficiently while cutting capital expenditures.',
    image_path: '/assets/images/cloud-services.webp',
    icon_name: 'cloud',
    display_order: 2,
    is_published: 1
  },
  {
    id: 3,
    title: 'Maintenance Solutions',
    slug: 'maintenance-solutions',
    description: 'Keep your systems running smoothly with expert maintenance and support.',
    detailed_content: 'Our technicians are certified by industry standards. We provide comprehensive preventative hardware maintenance, structured network cabling, workstation tuning, server health diagnostics, and emergency on-site hardware replacements to ensure peak operating performance.',
    image_path: '/assets/images/maintenance-solutions.webp',
    icon_name: 'wrench',
    display_order: 3,
    is_published: 1
  },
  {
    id: 4,
    title: 'IT Procurement',
    slug: 'it-procurement',
    description: 'Get the right technology, at the right price, from trusted partners.',
    detailed_content: 'Our team offers end-to-end IT procurement solutions. We source certified enterprise hardware, laptops, servers, network switches, and software licensing directly through global tier-1 technology vendors, guaranteeing competitive pricing and zero-touch deployment.',
    image_path: '/assets/images/it-procurement.webp',
    icon_name: 'shopping-cart',
    display_order: 4,
    is_published: 1
  },
  {
    id: 5,
    title: 'IT Consultancy',
    slug: 'it-consultancy',
    description: 'Strategic guidance to help you plan, build and grow with confidence.',
    detailed_content: 'Whether it is IT roadmap strategy, digital transformation, architecture planning, risk management, or regulatory IT compliance, our seasoned consultants align technology investments with your long-term business goals.',
    image_path: '/assets/images/it-consultancy.webp',
    icon_name: 'users',
    display_order: 5,
    is_published: 1
  },
  {
    id: 6,
    title: 'Security Solutions',
    slug: 'security-solutions',
    description: 'Protect your data, people and systems with advanced security solutions.',
    detailed_content: 'We architect multi-layered cybersecurity defense solutions. Our offerings include endpoint threat protection, managed next-gen firewalls, zero-trust network access, vulnerability assessments, email anti-phishing, and rapid incident response protocols.',
    image_path: '/assets/images/security-solutions.webp',
    icon_name: 'shield-check',
    display_order: 6,
    is_published: 1
  }
];

// GET /api/services
async function getServices(req, res, next) {
  try {
    const query = 'SELECT id, title, slug, description, image_path, icon_name, display_order FROM services WHERE is_published = 1 ORDER BY display_order ASC';
    const [rows] = await pool.query(query);

    if (rows && rows.length > 0) {
      return res.status(200).json({
        success: true,
        count: rows.length,
        data: rows
      });
    }

    // Fallback if table is empty
    return res.status(200).json({
      success: true,
      count: FALLBACK_SERVICES.length,
      data: FALLBACK_SERVICES
    });
  } catch (error) {
    console.error('[Services Controller Error]', error.message);
    // Graceful fallback to static verified records if database is down
    return res.status(200).json({
      success: true,
      count: FALLBACK_SERVICES.length,
      data: FALLBACK_SERVICES,
      _source: 'fallback'
    });
  }
}

// GET /api/services/:slug
async function getServiceBySlug(req, res, next) {
  const { slug } = req.params;

  try {
    const query = 'SELECT id, title, slug, description, detailed_content, image_path, icon_name FROM services WHERE slug = ? AND is_published = 1 LIMIT 1';
    const [rows] = await pool.query(query, [slug]);

    if (rows && rows.length > 0) {
      return res.status(200).json({
        success: true,
        data: rows[0]
      });
    }

    // Check fallback
    const fallback = FALLBACK_SERVICES.find(s => s.slug === slug);
    if (fallback) {
      return res.status(200).json({
        success: true,
        data: fallback
      });
    }

    return res.status(404).json({
      success: false,
      message: `Service with slug "${slug}" not found`
    });
  } catch (error) {
    console.error('[Services Controller Slug Error]', error.message);
    const fallback = FALLBACK_SERVICES.find(s => s.slug === slug);
    if (fallback) {
      return res.status(200).json({
        success: true,
        data: fallback,
        _source: 'fallback'
      });
    }
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve service'
    });
  }
}

module.exports = {
  getServices,
  getServiceBySlug
};
