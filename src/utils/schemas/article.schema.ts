import * as yup from 'yup';

export const ArticleSchema = yup.object().shape({
  title: yup.string().min(10).max(250).defined(),
  description: yup.string().min(10).max(500).defined(),
  body: yup.string().defined(),
  tagList: yup.array<string>().defined(),
});

export const UpdateArticleSchema = yup.object().shape({
  title: yup.string().min(10).max(250),
  description: yup.string().min(10).max(500),
  body: yup.string().optional(),
  tagList: yup.array<string>(),
});

export const CommentSchema = yup.object().shape({
  body: yup.string().min(3).max(500).defined(),
});
