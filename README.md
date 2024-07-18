
# AADL3 Registration Application

AADL3 Registration Application is an Electron-based desktop application designed to automate the registration process for AADL3. The application uses a form to collect user data and then sends this data to a server for processing. The application can also save, update, and delete user data locally.

![enter image description here](https://raw.githubusercontent.com/TerminalDZ/aadl3-register-request/main/screenshot.png)



  
  
  

## Features

  

- Collect user data through a form.

- Send collected data to a server for processing.

- Save, update, and delete user data locally.

- Display user data in a modal.

- Play a notification sound when data is successfully processed.

- Retry mechanism for data submission.

## Download

See the [releases](https://github.com/TerminalDZ/aadl3-register-request/releases) page to download the latest version of the application.

  

## Prerequisites

  

To run the application, you need to have [Node.js](https://nodejs.org) and [Yarn](https://yarnpkg.com) installed on your system.

  

## Installation

  

To install and run the application, follow these steps:

  

1.  **Clone the repository:**

```bash

git clone https://github.com/TerminalDZ/aadl3-register-request.git

cd aadl3-register-request

```

  

2.  **Install dependencies:**

```bash

yarn install

```

  

3.  **Start the application:**

```bash

yarn start

```

  

## Usage

  

1.  **Starting the Application:**

- Click the "التسجيل" button to start the registration process.

- Click the "ايقاف" button to stop the registration process.

  

2.  **Adding Data:**

- Click the "إضافة" button to open a modal for adding new data.

- Fill in the form and click "حفظ" to save the new data.

  

3.  **Updating Data:**

- Click the "عرض البيانات" button to view existing data.

- Click the "تعديل" button on any data card to open a modal for updating data.

- Fill in the form and click "حفظ التعديلات" to save the changes.

  

4.  **Deleting Data:**

- Click the "عرض البيانات" button to view existing data.

- Click the "حذف" button on any data card to delete the data.

  

5.  **Selecting Data:**

- Click the "عرض البيانات" button to view existing data.

- Click the "اختيار" button on any data card to fill the form with the selected data.

  

## Configuration

  

The application includes a settings panel where you can configure:

- Retry interval (in milliseconds)

- Maximum number of retries

- Cookie value

  

## File Structure

  

-  `index.html`: The main HTML file for the application.

-  `main.js`: The main Electron process script.

-  `aadl3.js`: The renderer process script that handles the form and user interactions.

-  `info.json`: The local data storage file.

-  `package.json`: The project configuration file.

-  `notification`: The notification sound file.

  

## Development

  

To build and publish the application:

  

1.  **Build the application:**

```bash

yarn build

```

  

2.  **Publish the application:**

```bash

yarn publish_app

```

  

## Contributing

  

If you would like to contribute to this project, please follow these steps:

  

1. Fork the repository.

2. Create a new branch: `git checkout -b my-feature-branch`.

3. Make your changes and commit them: `git commit -m 'Add my feature'`.

4. Push to the branch: `git push origin my-feature-branch`.

5. Submit a pull request.

  

## Contact

  

For any questions or feedback, please contact the author at [boukemoucheidriss@gmail.com](mailto:boukemoucheidriss@gmail.com).

  

---

  

# تطبيق تسجيل AADL3

  

تطبيق تسجيل AADL3 هو تطبيق سطح مكتب مبني على Electron مصمم لأتمتة عملية التسجيل في AADL3. يستخدم التطبيق نموذجًا لجمع بيانات المستخدم ثم يرسل هذه البيانات إلى الخادم للمعالجة. يمكن للتطبيق أيضًا حفظ وتحديث وحذف بيانات المستخدم محليًا.

![enter image description here](https://raw.githubusercontent.com/TerminalDZ/aadl3-register-request/main/screenshot.png)

  

## الميزات

  

- جمع بيانات المستخدم من خلال نموذج.

- إرسال البيانات المجمعة إلى الخادم للمعالجة.

- حفظ وتحديث وحذف بيانات المستخدم محليًا.

- عرض بيانات المستخدم في نافذة منبثقة.

- تشغيل صوت إشعار عند معالجة البيانات بنجاح.

- آلية إعادة المحاولة لإرسال البيانات.

  

## التنزيل

  

انظر صفحة [الإصدارات](https://github.com/TerminalDZ/aadl3-register-request/releases) لتنزيل أحدث إصدار من التطبيق.

  

## المتطلبات

  

لتشغيل التطبيق، يجب أن يكون لديك [Node.js](https://nodejs.org) و[Yarn](https://yarnpkg.com) مثبتين على نظامك.

  

## التثبيت

  

لتثبيت وتشغيل التطبيق، اتبع الخطوات التالية:

  

1.  **استنساخ المستودع:**

```bash

git clone https://github.com/TerminalDZ/aadl3-register-request.git

cd aadl3-register-request

```

  

2.  **تثبيت التبعيات:**

```bash

yarn install

```

  

3.  **بدء التطبيق:**

```bash

yarn start

```

  

## الاستخدام

  

1.  **بدء التطبيق:**

- انقر على زر "التسجيل" لبدء عملية التسجيل.

- انقر على زر "ايقاف" لإيقاف عملية التسجيل.

  

2.  **إضافة البيانات:**

- انقر على زر "إضافة" لفتح نافذة منبثقة لإضافة بيانات جديدة.

- املأ النموذج وانقر على "حفظ" لحفظ البيانات الجديدة.

  

3.  **تحديث البيانات:**

- انقر على زر "عرض البيانات" لعرض البيانات الحالية.

- انقر على زر "تعديل" على أي بطاقة بيانات لفتح نافذة منبثقة لتحديث البيانات.

- املأ النموذج وانقر على "حفظ التعديلات" لحفظ التغييرات.

  

4.  **حذف البيانات:**

- انقر على زر "عرض البيانات" لعرض البيانات الحالية.

- انقر على زر "حذف" على أي بطاقة بيانات لحذف البيانات.

  

5.  **اختيار البيانات:**

- انقر على زر "عرض البيانات" لعرض البيانات الحالية.

- انقر على زر "اختيار" على أي بطاقة بيانات لملء النموذج بالبيانات المحددة.

  

## التكوين

  

يتضمن التطبيق لوحة إعدادات يمكنك من خلالها تكوين:

- فترة إعادة المحاولة (بالملي ثانية)

- الحد الأقصى لعدد المحاولات

- قيمة الكوكي

  

## بنية الملفات

  

-  `index.html`: الملف الرئيسي لـ HTML للتطبيق.

-  `main.js`: برنامج عملية Electron الرئيسي.

-  `aadl3.js`: برنامج العملية الذي يتعامل مع النموذج وتفاعلات المستخدم.

-  `info.json`: ملف تخزين البيانات المحلي.

-  `package.json`: ملف تكوين المشروع.

  

## التطوير

  

لبناء ونشر التطبيق:

  

1.  **بناء التطبيق:**

```bash

yarn build

```

  

2.  **نشر التطبيق:**

```bash

yarn publish_app

```

  

## المساهمة

  

إذا كنت ترغب في المساهمة في هذا المشروع، يرجى اتباع الخطوات التالية:

  

1. استنساخ المستودع.

2. إنشاء فرع جديد: `git checkout -b my-feature-branch`.

3. قم بإجراء التغييرات الخاصة بك وقم بارتكابها: `git commit -m 'Add my feature'`.

4. دفع الفرع: `git push origin my-feature-branch`.

5. تقديم طلب دمج.

  

## الاتصال

  

لأي أسئلة أو ملاحظات، يرجى الاتصال بالمؤلف على [boukemoucheidriss@gmail.com](mailto:boukemoucheidriss@gmail.com).
