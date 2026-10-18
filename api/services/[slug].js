// Vercel Serverless Function: GET /api/services/:slug
// Returns a single service by slug

const SERVICES = [
  {
    id: 1, title: 'Managed Services', slug: 'managed-services',
    description: 'Proactive monitoring, management and support for your IT infrastructure.',
    detailed_content: 'Global IT ensures your systems are properly maintained at a mutually agreed upon SLA. Our managed IT services deliver 24/7/365 proactive monitoring, prompt patch deployment, network security management, automated backups, and dedicated technical helpdesk support to eliminate costly downtime.',
    image_path: '/assets/images/managed-services.webp', icon_name: 'server'
  },
  {
    id: 2, title: 'Cloud Services', slug: 'cloud-services',
    description: 'Flexible, scalable and secure cloud solutions for modern businesses.',
    detailed_content: 'Global IT provides leading cloud migration and architecture services to empower your workforce. From hybrid cloud deployments and Microsoft 365 migrations to high-availability multi-region cloud infrastructures, we scale computing power efficiently while cutting capital expenditures.',
    image_path: '/assets/images/cloud-services.webp', icon_name: 'cloud'
  },
  {
    id: 3, title: 'Maintenance Solutions', slug: 'maintenance-solutions',
    description: 'Keep your systems running smoothly with expert maintenance and support.',
    detailed_content: 'Our technicians are certified by industry standards. We provide comprehensive preventative hardware maintenance, structured network cabling, workstation tuning, server health diagnostics, and emergency on-site hardware replacements to ensure peak operating performance.',
    image_path: '/assets/images/maintenance-solutions.webp', icon_name: 'wrench'
  },
  {
    id: 4, title: 'IT Procurement', slug: 'it-procurement',
    description: 'Get the right technology, at the right price, from trusted partners.',
    detailed_content: 'Our team offers end-to-end IT procurement solutions. We source certified enterprise hardware, laptops, servers, network switches, and software licensing directly through global tier-1 technology vendors, guaranteeing competitive pricing and zero-touch deployment.',
    image_path: '/assets/images/it-procurement.webp', icon_name: 'shopping-cart'
  },
  {
    id: 5, title: 'IT Consultancy', slug: 'it-consultancy',
    description: 'Strategic guidance to help you plan, build and grow with confidence.',
    detailed_content: 'Whether it is IT roadmap strategy, digital transformation, architecture planning, risk management, or regulatory IT compliance, our seasoned consultants align technology investments with your long-term business goals.',
    image_path: '/assets/images/it-consultancy.webp', icon_name: 'users'
  },
  {
    id: 6, title: 'Security Solutions', slug: 'security-solutions',
    description: 'Protect your data, people and systems with advanced security solutions.',
    detailed_content: 'We architect multi-layered cybersecurity defense solutions. Our offerings include endpoint threat protection, managed next-gen firewalls, zero-trust network access, vulnerability assessments, email anti-phishing, and rapid incident response protocols.',
    image_path: '/assets/images/security-solutions.webp', icon_name: 'shield-check'
  }
];

module.exports = function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { slug } = req.query;
  const service = SERVICES.find(s => s.slug === slug);

  res.setHeader('Content-Type', 'application/json');

  if (service) {
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    return res.status(200).json({ success: true, data: service });
  }

  return res.status(404).json({ success: false, message: `Service with slug "${slug}" not found` });
};
