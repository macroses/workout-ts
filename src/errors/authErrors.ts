const mapAuthErrors = (error: string) => {
  if(error === 'Firebase: Error (auth/invalid-email).') {
    return 'Неверный логин или пароль';
  }
  if (error === 'Firebase: Error (auth/email-already-in-use).') {
    return 'Эта почта уже используется';
  }
  if(error === 'Firebase: Error (auth/user-not-found).') {
    return 'Пользователь с таким логином не найден';
  }
  if (error === 'Firebase: Error (auth/wrong-password).') {
    return 'Неверный пароль';
  }
}

export default mapAuthErrors;