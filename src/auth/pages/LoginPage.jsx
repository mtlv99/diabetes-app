/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useAuthStore } from '../../hooks';
import './LoginPage.css';

export const LoginPage = () => {
  const { startLogin, startRegister, errorMessage } = useAuthStore();

  // --- Login form ---
  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm({
    defaultValues: {
      loginEmail: '',
      loginPassword: '',
    },
  });

  const onLoginSubmit = (data) => {
    startLogin({ email: data.loginEmail, password: data.loginPassword });
  };

  // --- Register form ---
  const {
    register: registerRegister,
    handleSubmit: handleRegisterSubmit,
    watch,
    formState: { errors: registerErrors },
  } = useForm({
    defaultValues: {
      registerFirstName: '',
      registerLastName: '',
      registerEmail: '',
      registerPassword: '',
      registerPassword2: '',
      acceptTerms: false,
    },
  });

  // Watch password for matching check
  const watchPassword = watch('registerPassword', '');

  const onRegisterSubmit = (data) => {
    // If you rely on react-hook-form validations, these checks can be omitted;
    // but if you want to do additional checks, you can still do them here.

    // We already validate terms/password mismatch below, so no need for extra checks here.
    startRegister({
      firstName: data.registerFirstName,
      lastName: data.registerLastName,
      email: data.registerEmail,
      password: data.registerPassword,
      termsAccepted: data.acceptTerms,
    });
  };

  // Show any global errors coming from the auth store
  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire('Error en la autenticación', errorMessage, 'error');
    }
  }, [errorMessage]);

  return (
    <div className="container login-container">
      <div className="row">
        {/* --- LOGIN FORM --- */}
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={handleLoginSubmit(onLoginSubmit)}>
            <div className="form-group mb-2">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                {...loginRegister('loginEmail', {
                  required: 'El correo es requerido',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Formato de correo inválido',
                  },
                })}
              />
              {loginErrors.loginEmail && (
                <small className="text-danger">
                  {loginErrors.loginEmail.message}
                </small>
              )}
            </div>

            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                {...loginRegister('loginPassword', {
                  required: 'La contraseña es requerida',
                  minLength: {
                    value: 4,
                    message: 'Mínimo 4 caracteres',
                  },
                })}
              />
              {loginErrors.loginPassword && (
                <small className="text-danger">
                  {loginErrors.loginPassword.message}
                </small>
              )}
            </div>

            <div className="d-grid gap-2">
              <input
                type="submit"
                className="btnSubmit"
                value="Login"
              />
            </div>
          </form>
        </div>

        {/* --- REGISTER FORM --- */}
        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form onSubmit={handleRegisterSubmit(onRegisterSubmit)}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Primer nombre"
                {...registerRegister('registerFirstName', {
                  required: 'El primer nombre es requerido',
                })}
              />
              {registerErrors.registerFirstName && (
                <small className="text-danger">
                  {registerErrors.registerFirstName.message}
                </small>
              )}
            </div>

            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Segundo nombre"
                {...registerRegister('registerLastName', {
                  required: 'El segundo nombre es requerido',
                })}
              />
              {registerErrors.registerLastName && (
                <small className="text-danger">
                  {registerErrors.registerLastName.message}
                </small>
              )}
            </div>

            <div className="form-group mb-2">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                {...registerRegister('registerEmail', {
                  required: 'El correo es requerido',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Formato de correo inválido',
                  },
                })}
              />
              {registerErrors.registerEmail && (
                <small className="text-danger">
                  {registerErrors.registerEmail.message}
                </small>
              )}
            </div>

            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                {...registerRegister('registerPassword', {
                  required: 'La contraseña es requerida',
                  minLength: {
                    value: 4,
                    message: 'Mínimo 4 caracteres',
                  },
                })}
              />
              {registerErrors.registerPassword && (
                <small className="text-danger">
                  {registerErrors.registerPassword.message}
                </small>
              )}
            </div>

            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
                {...registerRegister('registerPassword2', {
                  required: 'Por favor repita la contraseña',
                  validate: (value) => value === watchPassword || 'Las contraseñas no coinciden',
                })}
              />
              {registerErrors.registerPassword2 && (
                <small className="text-danger">
                  {registerErrors.registerPassword2.message}
                </small>
              )}
            </div>

            <div className="form-group mb-2">
              <input
                type="checkbox"
                id="acceptTerms"
                {...registerRegister('acceptTerms', {
                  required: 'Debe aceptar los términos y condiciones',
                })}
              />
              { /* eslint-disable-next-line jsx-a11y/label-has-associated-control */ }
              <label htmlFor="acceptTerms" className="ms-1">
                Acepto los términos y condiciones
              </label>

              {registerErrors.acceptTerms && (
                <small className="text-danger d-block">
                  {registerErrors.acceptTerms.message}
                </small>
              )}
            </div>

            <div className="d-grid gap-2">
              <input
                type="submit"
                className="btnSubmit"
                value="Crear cuenta"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
