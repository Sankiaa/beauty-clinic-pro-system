
import React from "react";

const AboutSettings = () => {
  return (
    <div className="space-y-4 text-center">
      <h3 className="text-xl font-medium">مركز غُزل للجمال</h3>
      <p className="text-muted-foreground">الإصدار 1.0.0</p>
      
      <div className="py-4">
        <img
          src="/placeholder.svg"
          alt="شعار مركز غُزل للجمال"
          className="w-32 h-32 mx-auto rounded-full shadow-md hover:shadow-lg transition-shadow"
        />
      </div>
      
      <div className="space-y-2 text-sm">
        <p>رقم الهاتف: +963956961395</p>
        <p>العنوان: سوريا - ريف دمشق التل موقف طيبة مقابل امركز الثقافي الجديد تابع لعيادة د. رشا معتوق</p>
        <p>جميع الحقوق محفوظة © {new Date().getFullYear()}</p>
      </div>
    </div>
  );
};

export default AboutSettings;
