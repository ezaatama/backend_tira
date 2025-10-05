import Joi from "joi";

const createValidation = Joi.object({
  m_rep_id: Joi.string().max(7).required(),
  m_branch_id: Joi.string().max(3).required(),
  m_name: Joi.string().max(255).required(),
  m_current_position: Joi.string().max(10).required(),
  m_manager_id: Joi.string().max(10).optional(),
});

const updateValidation = Joi.object({
  m_branch_id: Joi.string().max(3).optional(),
  m_name: Joi.string().max(255).optional(),
});

const atasanIdValidation = Joi.string().max(10).required();

export {createValidation, updateValidation, atasanIdValidation}
