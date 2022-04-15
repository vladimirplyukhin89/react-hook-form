
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './Form.css';

function Form() {
  const {
    register,
    formState: { errors, isValid, isSubmitSuccessful },
    handleSubmit,
    reset
  } = useForm({
    mode: 'all',
    defaultValues: {
      firstName: '',
      lastName: ''
    }
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        firstName: '',
        lastName: ''
      })
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit = data => {
    console.log(JSON.stringify(data));
    console.log('render');
  }

  return (
    <div className="App">
      <h1>Hello, react-hook-form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='wrapper'>
          <div className='container'>
            <label>
              First name:
              <input
                {...register('firstName', {
                  required: {
                    value: true,
                    message: 'Поле обязательно к заполнению'
                  }
                })}
                placeholder='Имя'
              />
              <div style={{ height: "40px" }}>
                {errors?.firstName &&
                  <p className='error'>{errors?.firstName?.message || Error}</p>}
              </div>
            </label>
            <label>
              Last name:
              <input
                {...register('lastName', {
                  required: {
                    value: true,
                    message: 'Поле обязательно к заполнению'
                  },
                  minLength: {
                    value: 8,
                    message: 'Минимум 8 символов'
                  }
                })}
                type='password'
                placeholder='Пароль'
              />
              <div style={{ height: "40px" }}>
                {errors?.lastName &&
                  <p className='error'>{errors?.lastName?.message || Error}</p>}
              </div>
            </label>
            <input type='submit' disabled={!isValid} />
          </div>
        </div>
      </form>
    </div>
  );
}

export default Form;
