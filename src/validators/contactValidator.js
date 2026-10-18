const { z } = require('zod');

const contactSchema = z.object({
  name: z.string({
    required_error: 'Full name is required'
  }).trim().min(2, 'Name must be at least 2 characters').max(100, 'Name must not exceed 100 characters'),

  email: z.string({
    required_error: 'Email address is required'
  }).trim().email('Please provide a valid email address').max(120, 'Email must not exceed 120 characters'),

  company: z.string().trim().max(120, 'Company name must not exceed 120 characters').optional().or(z.literal('')),

  phone: z.string().trim().max(30, 'Phone number must not exceed 30 characters').optional().or(z.literal('')),

  service_interest: z.string().trim().max(100, 'Service interest must not exceed 100 characters').optional().or(z.literal('')),

  message: z.string({
    required_error: 'Message is required'
  }).trim().min(10, 'Message must be at least 10 characters').max(3000, 'Message must not exceed 3000 characters'),

  // Honeypot field for bot protection
  website_hp: z.string().optional()
});

function validateContactInput(data) {
  return contactSchema.safeParse(data);
}

module.exports = {
  contactSchema,
  validateContactInput
};
