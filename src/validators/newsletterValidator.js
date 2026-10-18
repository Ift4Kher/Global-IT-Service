const { z } = require('zod');

const newsletterSchema = z.object({
  email: z.string({
    required_error: 'Email address is required'
  }).trim().email('Please provide a valid email address').max(120, 'Email must not exceed 120 characters')
});

function validateNewsletterInput(data) {
  return newsletterSchema.safeParse(data);
}

module.exports = {
  newsletterSchema,
  validateNewsletterInput
};
