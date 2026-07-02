// utils/redirectUtils.js

export const CustomerApp = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    
    // Track the event

    const appleStore = "https://play.google.com/store/apps/details?id=com.zuget.customer_app&hl=en";
    const googleStore = "https://play.google.com/store/apps/details?id=com.zuget.customer_app&hl=en";

    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        // Redirect to App Store - Use window.location.assign instead of window.open
        window.location.assign(appleStore);
    } else if (/android/i.test(userAgent)) {
        // Redirect to Play Store - Use window.location.assign
        window.location.assign(googleStore);
    } else {
        alert("App is available only on mobile devices.");
    }
};