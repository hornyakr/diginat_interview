import { selectTitle, submitTitle } from "@/lib/features/blog/blogSlice";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from 'yup';

export default function Home() {
  const dispatch = useDispatch();
  const title = useAppSelector(selectTitle)

  return (
    <Formik
      initialValues={{ title: title }}
      validationSchema={Yup.object({
        title: Yup.string()
          .required('Kérem adja meg a blog címét!')
      })}
      onSubmit={(values, { setSubmitting }) => {
        dispatch(submitTitle(values.title))
      }}
    >
      <Form>
        <label htmlFor="title">Cím</label>
        <Field name="title" type="text" />
      </Form>
    </Formik >
  );
}
