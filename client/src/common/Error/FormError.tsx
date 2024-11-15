import { connect, getIn } from 'formik';

function FormError({ formik, name, errorClass }: any) {
  const error = getIn(formik.errors, name);

  const touch = getIn(formik.touched, name);

  return touch && error ? (
    <span
      className={`${errorClass} mb-3 block break-words pt-1 text-sm leading-4 text-[#ab4b4b] sm:leading-5`}
    >
      {error}
    </span>
  ) : null;
}

export default connect(FormError);
