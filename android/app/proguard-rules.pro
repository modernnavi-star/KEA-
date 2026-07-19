# Add project specific ProGuard rules here.
# Keep WebView JavaScript interface
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}

# Keep the app classes
-keep class com.kea.prep.** { *; }

# WebView
-keepclassmembers class android.webkit.WebView {
    public *;
}
