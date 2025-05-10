import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';

const Settings = () => {
  const { t } = useTranslation();
  const { user, dispatch } = useContext(AuthContext);

  useEffect(() => {
    if (user?.userId) {
      localStorage.setItem('userId', user.userId.toString());
    }
  }, [user]);

  if (!user) return <p>{t('profile_settings.login_first')}</p>;

  const [formData, setFormData] = useState({
    username: user.username || '',
    email: user.email || '',
    password: user.password || '',
    firstName: user.first_name || user.firstName || '',
    lastName: user.last_name || user.lastName || '',
    phone: user.phone || ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/auth/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.userId,
          username: formData.username,
          email: formData.email,
          password: formData.password,
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone: formData.phone
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || t('profile_settings.error_generic'));
      }

      const updatedUser = await response.json();

      dispatch({ type: "LOGIN_SUCCESS", payload: updatedUser });
      localStorage.setItem("user", JSON.stringify(updatedUser));
      localStorage.setItem("userId", updatedUser.userId.toString());

      alert(t('profile_settings.update_success'));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '20px' }}>{t('profile_settings.settings_title')}</h2>
      <form className="settings-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>{t('profile_settings.username')}</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>{t('profile_settings.email')}</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>{t('profile_settings.password')}</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>{t('profile_settings.first_name')}</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>{t('profile_settings.last_name')}</label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>{t('profile_settings.phone')}</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
        </div>

        <button type="submit" className="btn btn-primary">
          {t('profile_settings.save_changes')}
        </button>
      </form>
    </div>
  );
};

export default Settings;
