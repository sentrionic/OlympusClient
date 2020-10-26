import * as yup from 'yup';
const DESCRIPTION_MAX_LENGTH = 150;
const TITLE_MAX_LENGTH = 100;

export const ArticleSchema = yup.object().shape({
  title: yup.string().min(10).max(TITLE_MAX_LENGTH).defined(),
  description: yup.string().min(10).max(DESCRIPTION_MAX_LENGTH).defined(),
  body: yup.string().defined(),
  tagList: yup
    .array<string>(yup.string().min(3).max(15).defined())
    .max(5)
    .defined(),
});

export const UpdateArticleSchema = yup.object().shape({
  title: yup.string().min(10).max(TITLE_MAX_LENGTH).optional(),
  description: yup.string().min(10).max(DESCRIPTION_MAX_LENGTH).optional(),
  body: yup.string().optional(),
  tagList: yup.array<string>(yup.string().min(3).max(15).defined()).max(5),
});

export const CommentSchema = yup.object().shape({
  body: yup.string().min(3).max(250).defined(),
});
