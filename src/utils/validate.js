export const checkValidData = (email, password) => {
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isPasswordValid = password.length >= 6;

    if (!isEmailValid) return "Email is not valid";
    if (!isPasswordValid) return "Password must be at least 6 characters";

    return null;
};
