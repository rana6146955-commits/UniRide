(() => {
'use strict';

const DATA = window.UNIRIDE_DATA;
const PASS = 'UniRide@2026';
const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => [...r.querySelectorAll(s)];
const store = {
  get(k, fallback){ try { const v=localStorage.getItem('ur3_'+k); return v ? JSON.parse(v) : fallback; } catch { return fallback; } },
  set(k,v){ try { localStorage.setItem('ur3_'+k, JSON.stringify(v)); } catch {} }
};

const ICONS = {
  bus:'<rect x="3" y="4" width="18" height="14" rx="4"/><path d="M6 18v2M18 18v2M6 9h12M7 14h.01M17 14h.01"/>',
  user:'<path d="M20 21a8 8 0 0 0-16 0"/><circle cx="12" cy="7" r="4"/>',
  'user-circle':'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="9" r="3"/><path d="M6.5 19c1.2-3 3-4.5 5.5-4.5S16.3 16 17.5 19"/>',
  lock:'<rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',eye:'<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="2.5"/>',
  'arrow-right':'<path d="M5 12h14M14 7l5 5-5 5"/>',menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',bell:'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',
  'chevron-down':'<path d="m7 10 5 5 5-5"/>',logout:'<path d="M10 17l5-5-5-5M15 12H3M14 4h6a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-6"/>',
  home:'<path d="m3 11 9-7 9 7"/><path d="M5 10v10h14V10M9 20v-6h6v6"/>',calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/>',
  route:'<circle cx="6" cy="18" r="2"/><circle cx="18" cy="6" r="2"/><path d="M8 18h2a4 4 0 0 0 4-4v-4a4 4 0 0 1 4-4"/>',
  ticket:'<path d="M4 6h16v4a2 2 0 0 0 0 4v4H4v-4a2 2 0 0 0 0-4V6Z"/><path d="M12 8v8"/>',
  users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  map:'<path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z"/><path d="M9 3v15M15 6v15"/>',
  'message-square':'<path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z"/>',
  alert:'<path d="M10.3 2.9 1.8 17a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 2.9a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4M12 17h.01"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',pin:'<path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
  seat:'<path d="M7 11V6a3 3 0 0 1 6 0v5M5 11h12a2 2 0 0 1 2 2v5H5a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2Z"/><path d="M6 18v3M18 18v3"/>',
  check:'<path d="m5 12 4 4L19 6"/>',x:'<path d="M6 6l12 12M18 6 6 18"/>',
  activity:'<path d="M3 12h4l2-7 4 14 2-7h6"/>',chart:'<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',settings:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V21h-4v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H3v-4h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.6V3h4v.1a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1H21v4h-.1a1.7 1.7 0 0 0-1.5 1Z"/>',
  shield:'<path d="M12 3 4 6v5c0 5 3.4 8.7 8 10 4.6-1.3 8-5 8-10V6l-8-3Z"/><path d="m9 12 2 2 4-4"/>',
  megaphone:'<path d="M3 11v2a2 2 0 0 0 2 2h2l6 4V5L7 9H5a2 2 0 0 0-2 2Z"/><path d="M16 9a4 4 0 0 1 0 6M19 6a8 8 0 0 1 0 12"/>',
  search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',plus:'<path d="M12 5v14M5 12h14"/>',edit:'<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4L16.5 3.5Z"/>',
  id:'<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8" cy="11" r="2"/><path d="M5.5 16c.7-1.6 1.5-2.4 2.5-2.4s1.8.8 2.5 2.4M13 10h5M13 14h5"/>',
  mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/>',building:'<path d="M3 21h18M5 21V6l7-3 7 3v15M9 9h.01M15 9h.01M9 13h.01M15 13h.01M9 17h.01M15 17h.01"/>',
  star:'<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z"/>',
  'clipboard':'<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V2h6v2M9 9h6M9 13h6M9 17h4"/>',
  filter:'<path d="M4 5h16l-6 7v5l-4 2v-7L4 5Z"/>',refresh:'<path d="M20 6v5h-5M4 18v-5h5"/><path d="M18.5 9A7 7 0 0 0 6 6.5L4 9M5.5 15A7 7 0 0 0 18 17.5L20 15"/>',
  save:'<path d="M5 3h12l2 2v16H5V3Z"/><path d="M8 3v6h8V3M8 21v-8h8v8"/>',
  'arrow-up':'<path d="M12 19V5M7 10l5-5 5 5"/>'
};
function icon(name, cls=''){ return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]||ICONS.activity}</svg>`; }
function brandMark(){ return `<svg viewBox="0 0 56 56" fill="none" aria-hidden="true"><rect class="brand-u-bg" x="3" y="3" width="50" height="50" rx="17"/><path class="brand-u-road" d="M15 13v17c0 9 5.2 14 13 14s13-5 13-14V13"/><path class="brand-u-lane" d="M23 14v15c0 4.2 1.8 6.4 5 6.4s5-2.2 5-6.4V14"/><circle class="brand-u-dot" cx="15" cy="13" r="2.2"/><circle class="brand-u-dot" cx="41" cy="13" r="2.2"/></svg>`; }

const students = DATA.users.filter(u=>u.role==='student');
const drivers = DATA.users.filter(u=>u.role==='driver');
const allStudents = DATA.students || students;
const allDrivers = DATA.drivers || drivers;
const staffUsers = DATA.users.filter(u=>u.role==='staff');
const adminUsers = DATA.users.filter(u=>u.role==='admin');
const ROLES = {student:'Student',driver:'Driver',staff:'Transport Staff',admin:'System Admin'};
let LANG = store.get('lang','en');
const AR = {
  'Campus transport, coordinated.':'نقل جامعي منسق بذكاء.','University transportation, organized':'نقل جامعي منظم وذكي','Know your bus.':'اعرف حافلتك.','Reserve your seat.':'احجز مقعدك.','Arrive on time.':'وصل في الموعد.',
  'One place for assigned routes, seat reservations, trip reminders, service updates and transport operations.':'مكان واحد للمسارات المخصصة وحجز المقاعد وتذكيرات الرحلات وتحديثات الخدمة وإدارة النقل.',
  'Live transport information':'معلومات النقل الحالية','Secure access':'دخول آمن','Welcome back':'مرحبًا بعودتك',
  'Sign in with a student code, driver code, staff username or admin username.':'سجّل الدخول بكود الطالب أو كود السائق أو اسم مستخدم الموظف أو المدير.',
  'e.g. 2022111102':'مثال: 2022111102','Account ID':'معرّف الحساب','Password':'كلمة المرور','Sign in':'تسجيل الدخول','Account access':'اختيار الحساب','Password: UniRide@2026':'كلمة المرور: UniRide@2026','Dashboard':'لوحة التحكم','registered students':'طالب مسجل','active route records':'مسار جامعي','verified drivers':'سائق مسجل',
  'Student':'طالب','Driver':'سائق','Transport Staff':'موظف النقل','System Admin':'مدير النظام','Workspace':'مساحة العمل','Profile':'الملف الشخصي','Sign out':'تسجيل الخروج',
  'Overview':'نظرة عامة','Reserve a seat':'حجز مقعد','My route & stops':'مساري والمحطات','Notifications':'الإشعارات','Support & feedback':'الدعم والملاحظات',
  'Driver overview':'لوحة السائق','Assigned services':'الرحلات المسندة','Passenger manifest':'قائمة الركاب','Report an issue':'الإبلاغ عن مشكلة',
  'Operations overview':'نظرة تشغيلية','Service operations':'إدارة الرحلات','Routes & capacity':'المسارات والسعة','Announcements':'الإعلانات','Student support':'دعم الطلاب','Reports':'التقارير',
  'System overview':'نظرة النظام','Accounts':'الحسابات','Records export':'تصدير السجلات','Records':'السجلات','Download CSV':'تنزيل CSV','Current transport records':'سجلات النقل الحالية','Export complete':'اكتمل التصدير','CSV file downloaded.':'تم تنزيل ملف CSV.','Roles & access':'الأدوار والصلاحيات','System settings':'إعدادات النظام','Activity log':'سجل النشاط',
  'Your transport':'نقلك الجامعي','Assigned university transport':'النقل الجامعي المخصص','Your route is ready when you are.':'مسارك جاهز عندما تكون جاهزًا.',
  'Reserve your seat before travelling. UniRide will remind you to arrive early, and your reservation automatically updates the driver’s passenger manifest.':'احجز مقعدك قبل الرحلة. سيذكّرك UniRide بالحضور مبكرًا، وسيظهر حجزك تلقائيًا في قائمة ركاب السائق.',
  'View route':'عرض المسار','Assigned route':'المسار المخصص','Reserved services':'الحجوزات','Estimated route':'المدة التقديرية','Unread updates':'تحديثات غير مقروءة','Upcoming services':'الرحلات القادمة',
  'Reserve only the days you plan to travel.':'احجز فقط الأيام التي تخطط للسفر فيها.','View all':'عرض الكل','Your assigned route':'مسارك المخصص','Operating days':'أيام التشغيل','Distance':'المسافة',
  'Student services':'خدمات الطالب','Schedule window':'فترة الجدول','Your reservations':'حجوزاتك','Arrival reminder':'تذكير الوصول','Available departures':'المواعيد المتاحة',
  'Your route is assigned by the university. Choose the services you will actually use.':'المسار محدد من الجامعة. اختر الرحلات التي ستستخدمها فعليًا.','Release seat':'إلغاء الحجز','Seat reserved':'تم حجز المقعد','Reserve seat':'احجز مقعدًا','Seat occupancy':'إشغال المقاعد',
  'Updates & reminders':'التحديثات والتذكيرات','Seat reminders, service changes and operational updates.':'تذكيرات المقاعد وتغييرات الخدمة والتحديثات التشغيلية.','Mark all read':'تحديد الكل كمقروء',
  'Today’s service':'رحلة اليوم','Reserved students':'الطلاب الحاجزون','Vehicle capacity':'سعة الحافلة','Driver rating':'تقييم السائق','Completed services':'الرحلات المكتملة','Next services':'الرحلات القادمة','Passenger readiness':'جاهزية الركاب',
  'Your assigned university departures.':'الرحلات الجامعية المسندة إليك.','Reserved seats for the next service.':'المقاعد المحجوزة للرحلة القادمة.','No reservations yet':'لا توجد حجوزات بعد','Passenger reservations will appear automatically.':'ستظهر حجوزات الطلاب تلقائيًا.',
  'Transport staff':'موظف النقل','Services today':'رحلات اليوم','Seat reservations':'حجوزات المقاعد','Route records':'سجلات المسارات','Live operations':'العمليات النشطة','Completed services trend':'اتجاه الرحلات المكتملة','Transport activity by month.':'نشاط البيانات حسب الشهر.',
  'Top universities':'أكثر الجامعات نشاطًا','Highest recorded transport activity.':'أعلى نشاط نقل في البيانات المرفوعة.','Operational issues':'المشكلات التشغيلية','Operational support categories.':'تصنيفات مشكلات الدعم التشغيلي.','Capacity watch':'مراقبة السعة',
  'Services with the highest current reservation percentage.':'الرحلات ذات أعلى نسبة حجز حاليًا.','Live & upcoming':'النشطة والقادمة','Service board':'لوحة الرحلات','Advance service states and monitor reserved passenger counts.':'تابع حالات الرحلات وعدد الركاب الحاجزين.',
  'Network management':'إدارة الشبكة','Route network':'شبكة المسارات','University route records with capacity and service details.':'سجلات المسارات من بيانات UniRide المرفوعة مع تفاصيل السعة والرحلات.',
  'Support queue':'قائمة الدعم','Support requests':'طلبات الدعم','Student feedback and operational issues.':'ملاحظات الطلاب والمشكلات التشغيلية.','Resolve':'حل','Resolved':'تم الحل','Open':'مفتوحة','InProgress':'قيد المعالجة',
  'Administration':'الإدارة','Student accounts':'حسابات الطلاب','Driver accounts':'حسابات السائقين','Universities':'الجامعات','Student account status':'حالة حسابات الطلاب','Current student account-state distribution.':'توزيع حالات الحسابات في البيانات.',
  'Driver account status':'حالة حسابات السائقين','Driver access distribution.':'توزيع وصول السائقين.','System health':'حالة النظام','Application status.':'حالة النظام.','Authentication':'المصادقة','Reservation service':'خدمة الحجز','Data synchronization':'مزامنة البيانات','Recent activity':'النشاط الأخير','Latest stored transport records.':'أحدث سجلات النقل المحفوظة.',
  'Identity management':'إدارة الهوية','Account access':'اختيار الحساب','Students, drivers, transport staff and system administrators.':'طلاب وسائقون وموظفو نقل ومديرو نظام.','Roles & access':'الأدوار والصلاحيات','Permissions':'الصلاحيات','Configuration':'الإعدادات','Transport settings':'إعدادات النقل',
  'Student seat reservations':'حجز مقاعد الطلاب','Automatic reservation reminders':'تذكيرات الحجز التلقائية','Driver passenger manifests':'قوائم ركاب السائقين','Service update notifications':'إشعارات تحديث الرحلات','Save settings':'حفظ الإعدادات','Data & security':'البيانات والأمان','Local session storage':'التخزين المحلي','Role-based navigation':'تنقل حسب الصلاحية','Last local backup':'آخر نسخة احتياطية','Reset local data':'إعادة ضبط البيانات المحلية',
  'Account details':'بيانات الحساب','Account ID':'معرّف الحساب','Email':'البريد الإلكتروني','University':'الجامعة','Faculty / year':'الكلية / السنة','Assigned route':'المسار المخصص','Pickup area':'منطقة الركوب','Vehicle':'المركبة','Profile preferences':'تفضيلات الملف الشخصي','These settings are saved to your current UniRide session.':'يتم حفظ هذه الإعدادات في حساب UniRide الحالي.','Display name':'اسم العرض','Contact email':'بريد التواصل','Reservation / service reminders':'تذكيرات الحجز والرحلات','Operational notifications':'الإشعارات التشغيلية','Save profile':'حفظ الملف',
  'Active':'نشط','Inactive':'غير نشط','Suspended':'موقوف','Scheduled':'مجدولة','Boarding':'صعود الركاب','Departed':'انطلقت','Completed':'مكتملة','Cancelled':'ملغاة','Pending':'قيد الانتظار','High':'عالية','Medium':'متوسطة','Low':'منخفضة',
  'Service':'الرحلة','Departure':'الموعد','Reserved':'المحجوز','Status':'الحالة','Action':'إجراء','Route':'المسار','Route name':'اسم المسار','Duration':'المدة','Reserved / seats':'المحجوز / المقاعد','Name':'الاسم','Role':'الدور','Details':'التفاصيل','Time':'الوقت','Event':'الحدث','ID':'المعرّف','Category':'التصنيف','Subject':'الموضوع','Priority':'الأولوية',
  'Seat reserved':'تم حجز المقعد','Your place is saved. Please be at the pickup point 10 minutes before departure. A reminder was also added to Notifications.':'تم حفظ مقعدك. يرجى الوصول إلى نقطة الركوب قبل الموعد بـ10 دقائق. تمت إضافة التذكير أيضًا إلى الإشعارات.',
  'View my reservation':'عرض حجزي','Stay here':'البقاء هنا','Upcoming UniRide reminder':'تذكير UniRide للرحلة القادمة','I will be on time':'سأكون في الموعد','Open notifications':'فتح الإشعارات','Settings saved':'تم حفظ الإعدادات','Profile saved':'تم حفظ الملف الشخصي','Request sent':'تم إرسال الطلب','Announcement sent':'تم إرسال الإعلان','Service updated':'تم تحديث الرحلة','Request resolved':'تم حل الطلب'
};

Object.assign(AR,{
 'Enter your account ID and password.':'أدخل معرّف الحساب وكلمة المرور.','Account not found. Check the ID and try again.':'الحساب غير موجود. تحقق من المعرّف وحاول مرة أخرى.','Incorrect password.':'كلمة المرور غير صحيحة.',
 'Records export':'تصدير السجلات','Records':'السجلات','Download CSV':'تنزيل CSV','Current transport records':'سجلات النقل الحالية','Export complete':'اكتمل التصدير','CSV file downloaded.':'تم تنزيل ملف CSV.','Recent trip records':'أحدث سجلات الرحلات','Route records':'سجلات المسارات','Support records':'سجلات الدعم','User records':'سجلات المستخدمين','Trip records':'سجلات الرحلات','Students':'الطلاب','Drivers':'السائقون','records used throughout UniRide.':'سجلات مستخدمة داخل UniRide.',
 'Pickup area':'منطقة الركوب','Your assigned pickup area':'منطقة الركوب المخصصة لك','Route checkpoint':'محطة وسيطة','Shared pickup checkpoint':'نقطة ركوب مشتركة','University arrival':'الوصول إلى الجامعة',
 'Next service':'الرحلة القادمة','No seat reserved yet':'لم تحجز مقعدًا بعد','Open Reserve a seat to confirm your place.':'افتح صفحة حجز المقعد لتأكيد مكانك.','Reserved service':'الرحلة المحجوزة','Date':'التاريخ','Pickup':'الركوب','10 min early':'قبل الموعد بـ10 دقائق',
 'Driver pending':'السائق قيد التحديد','Seat occupancy':'إشغال المقاعد','No service assigned':'لا توجد رحلة مسندة','Passenger data appears with an assigned service.':'تظهر بيانات الركاب عند إسناد رحلة.',
 'Service is full':'الرحلة ممتلئة','Choose another departure.':'اختر موعدًا آخر.','Reservation cancelled':'تم إلغاء الحجز','The seat is available to another student.':'أصبح المقعد متاحًا لطالب آخر.',
 'Complete the form':'أكمل النموذج','Add a subject and details first.':'أضف الموضوع والتفاصيل أولًا.','Your support request is now in the transport queue.':'تمت إضافة طلب الدعم إلى قائمة موظفي النقل.',
 'Announcement sent':'تم إرسال الإعلان','Complete the announcement':'أكمل الإعلان','Add a title and message.':'أضف العنوان والرسالة.','Report sent':'تم إرسال البلاغ','Transport staff has been notified.':'تم إخطار موظف النقل.',
 'Account status updated':'تم تحديث حالة الحساب','Transport record synchronized':'تمت مزامنة سجل النقل','Service status changed':'تم تغيير حالة الرحلة','Service status updated':'تم تحديث حالة الرحلة',
 'Trip ID':'معرّف الرحلة','University':'الجامعة','Driver':'السائق','Reserved':'محجوز','Capacity':'السعة','Title':'العنوان','Message':'الرسالة','Audience':'المستلمون','Send announcement':'إرسال الإعلان','All students':'كل الطلاب','Trip ID':'معرّف الرحلة','University / area':'الجامعة / المنطقة','All drivers':'كل السائقين','Everyone':'الجميع'
});

Object.assign(AR,{'Full':'مكتمل','Request assignment':'طلب تعيين المسار','Route request sent':'تم إرسال طلب المسار','Explore routes':'استكشاف المسارات','University route network':'شبكة المسارات الجامعية','Find your university route':'ابحث عن مسار جامعتك','Explore routes across Egypt.':'استكشف المسارات في مختلف محافظات مصر.','Browse by governorate':'تصفح حسب المحافظة','All governorates':'كل المحافظات','All universities':'كل الجامعات','Search':'بحث','Route, city or pickup area':'المسار أو المدينة أو منطقة الركوب','View details':'عرض التفاصيل','Save route':'حفظ المسار','Route saved':'تم حفظ المسار','You can return to this route from your profile.':'يمكنك الرجوع إلى هذا المسار من ملفك الشخصي.','Available driver':'سائق متاح','Choose the areas you can serve.':'اختر المناطق التي يمكنك خدمتها.','Route network':'شبكة المسارات','Availability':'التوافر','Current status':'الحالة الحالية','University transport, simplified':'نقل جامعي أسهل وأكثر تنظيمًا','University Bus Service':'خدمة الحافلات الجامعية','Your campus. Your route. On time.':'جامعتك. مسارك. في الموعد.','One reliable ride':'رحلة موثوقة واحدة','between you':'بينك','and campus.':'وبين جامعتك.','Explore university routes, reserve your seat, receive service reminders, and keep every trip coordinated from one place.':'استكشف مسارات الجامعات واحجز مقعدك واستقبل التذكيرات وتابع رحلتك من مكان واحد.','Student · assigned route':'طالب · مسار مخصص','Student · route explorer':'طالب · استكشاف المسارات','Driver · assigned services':'سائق · رحلات مسندة','Driver · available':'سائق · متاح','Transport staff':'موظف النقل','System admin':'مدير النظام','Governorate':'المحافظة','Clear':'مسح','routes shown':'مسار معروض','Click any request to open its full details and status.':'اضغط على أي طلب لعرض التفاصيل والحالة كاملة.'});
const AR_PARTS = [
 [' min',' دقيقة'],[' km',' كم'],[' reserved',' محجوز'],[' more students',' طلاب إضافيين'],['Driver pending','السائق قيد التحديد'],['No service','لا توجد رحلة'],['No data','لا توجد بيانات'],['No service assigned','لا توجد رحلة مسندة'],['Not provided','غير متوفر'],['Seat ','مقعد ']
];
function tr(s){
  if(LANG!=='ar' || s==null) return String(s??'');
  let out=AR[String(s).trim()] ?? String(s);
  if(out===String(s)) AR_PARTS.forEach(([a,b])=>{out=out.split(a).join(b)});
  return out;
}
function locale(){ return LANG==='ar'?'ar-EG':'en-GB'; }
const NAME_EN_FIX={STU001251:'Farah Salah Adham',STU001841:'Amira Adam Gamal',DRV000074:'Abdel Nasser Hamdy Abdelmalek',DRV000126:'Adel Rami Abdallah'};
function displayName(u){ if(!u)return ''; if(LANG==='en')return NAME_EN_FIX[u.id]||u.nameEn||(/[\u0600-\u06FF]/.test(u.name||'')?translitArabic(u.name):u.name); return u.name; }
function displayUniName(name,u=null){ if(LANG==='en') return (u&&u.uniEn)||DATA.universityEnglish?.[name]||name; return name; }
const GOV_EN={'القاهرة':'Cairo','الجيزة':'Giza','الإسكندرية':'Alexandria','الدقهلية':'Dakahlia','البحيرة':'Beheira','الغربية':'Gharbia','الشرقية':'Sharqia','القليوبية':'Qalyubia','المنوفية':'Monufia','كفر الشيخ':'Kafr El Sheikh','دمياط':'Damietta','بورسعيد':'Port Said','الإسماعيلية':'Ismailia','السويس':'Suez','شمال سيناء':'North Sinai','جنوب سيناء':'South Sinai','الفيوم':'Fayoum','بني سويف':'Beni Suef','المنيا':'Minya','أسيوط':'Assiut','سوهاج':'Sohag','قنا':'Qena','الأقصر':'Luxor','أسوان':'Aswan','الوادي الجديد':'New Valley','مطروح':'Matrouh','البحر الأحمر':'Red Sea'};
function translitArabic(s=''){const m={'ا':'a','أ':'a','إ':'i','آ':'a','ب':'b','ت':'t','ث':'th','ج':'g','ح':'h','خ':'kh','د':'d','ذ':'dh','ر':'r','ز':'z','س':'s','ش':'sh','ص':'s','ض':'d','ط':'t','ظ':'z','ع':'a','غ':'gh','ف':'f','ق':'q','ك':'k','ل':'l','م':'m','ن':'n','ه':'h','ة':'a','و':'w','ؤ':'o','ي':'y','ى':'a','ئ':'e','ء':'','َ':'','ُ':'','ِ':'','ّ':'','ْ':'','ـ':''};return String(s).split('').map(c=>m[c]??c).join('').replace(/\s+/g,' ').trim().replace(/\b\w/g,c=>c.toUpperCase());}
const DATA_EN={'السبت - الخميس':'Saturday–Thursday','تأخر السائق':'Driver delay','مشكلة في التطبيق':'App issue','موقع التقاط غير صحيح':'Incorrect pickup point','عدم توفر سائق':'No driver available','فقدان متعلقات':'Lost property','سلوك السائق':'Driver conduct','مشكلة في الرحلة':'Trip issue','شكوى عامة':'General complaint','مقترح':'Suggestion','مشكلة في المسار':'Route issue','ذكر':'Male','أنثى':'Female','حكومية':'Public','خاصة':'Private'};
function dataEn(v){if(LANG!=='en')return v;return DATA.universityEnglish?.[v]||GOV_EN[v]||DATA_EN[v]||translitArabic(v);}
function routeName(route){if(LANG==='ar')return route.n;const place=route.startDistrict||route.startCity||route.startGov;return `${dataEn(place)} — ${route.uniEn||displayUniName(route.uni)}`;}
function facultyName(u){if(LANG==='ar')return u.faculty||''; const d={'كلية طب الأسنان':'Faculty of Dentistry','كلية الطب البشري':'Faculty of Medicine','كلية الهندسة':'Faculty of Engineering','كلية التربية':'Faculty of Education','كلية التجارة':'Faculty of Commerce','كلية الإعلام':'Faculty of Mass Communication'};return d[u.faculty]||translitArabic(u.faculty||'');}
function displayDataValue(v){ return LANG==='en'?dataEn(v):v; }
function localizeTree(root=document){
  document.documentElement.lang=LANG; document.documentElement.dir=LANG==='ar'?'rtl':'ltr';
  root.querySelectorAll?.('[data-lang-toggle]').forEach(b=>b.textContent=LANG==='ar'?'English':'العربية');
  const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT); let node;
  while(node=walker.nextNode()){
    if(['SCRIPT','STYLE'].includes(node.parentElement?.tagName)) continue;
    if(node.__urOrig===undefined) node.__urOrig=node.nodeValue;
    node.nodeValue=LANG==='ar'?tr(node.__urOrig):node.__urOrig;
  }
  root.querySelectorAll?.('[placeholder]').forEach(el=>{ if(el.__urPlaceholder===undefined)el.__urPlaceholder=el.placeholder; el.placeholder=LANG==='ar'?tr(el.__urPlaceholder):el.__urPlaceholder; });
}
function toggleLanguage(){ LANG=LANG==='en'?'ar':'en'; store.set('lang',LANG); if(currentUser){ buildNav(); render(); $('#sidebarUser').innerHTML=`<strong>${safe(displayName(currentUser))}</strong><span>${safe(tr(ROLES[currentUser.role]))}</span>`; $('#topName').textContent=displayName(currentUser); $('#topRole').textContent=tr(ROLES[currentUser.role]); } localizeTree(document); }

const ROLE_NAV = {
 studentAssigned:[['home','Overview','home'],['reserve','Reserve a seat','seat'],['route','My route & stops','route'],['explore','Explore routes','map'],['notifications','Notifications','bell'],['complaints','Support & feedback','message-square']],
 studentExplore:[['home','Overview','home'],['explore','Explore routes','map'],['notifications','Notifications','bell'],['complaints','Support & feedback','message-square']],
 driverAssigned:[['home','Driver overview','home'],['trips','Assigned services','calendar'],['passengers','Passenger manifest','users'],['network','Route network','route'],['report','Report an issue','alert'],['notifications','Notifications','bell']],
 driverAvailable:[['home','Driver overview','home'],['network','Route network','route'],['availability','Availability','calendar'],['report','Report an issue','alert'],['notifications','Notifications','bell']],
 staff:[['home','Operations overview','home'],['services','Service operations','bus'],['routes','Routes & capacity','route'],['data','Records export','clipboard'],['announcements','Announcements','megaphone'],['tickets','Student support','message-square'],['reports','Reports','chart'],['notifications','Notifications','bell']],
 admin:[['home','System overview','home'],['accounts','Accounts','users'],['data','Records','clipboard'],['roles','Roles & access','shield'],['settings','System settings','settings'],['audit','Activity log','activity'],['notifications','Notifications','bell']]
};
function navForUser(u){if(u.role==='student')return u.mode==='explore'?ROLE_NAV.studentExplore:ROLE_NAV.studentAssigned;if(u.role==='driver')return u.mode==='available'?ROLE_NAV.driverAvailable:ROLE_NAV.driverAssigned;return ROLE_NAV[u.role];}

let currentUser = null;
let currentView = 'home';
let schedules = [];
const uiState = {sidebar:false};

function initials(name='U'){ return name.trim().split(/\s+/).slice(0,2).map(x=>x[0]).join('').toUpperCase(); }
function fmtNumber(n){ return new Intl.NumberFormat(locale()).format(n||0); }
function dateKey(d){ return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; }
function formatDate(d){ return new Intl.DateTimeFormat(locale(),{weekday:'short',day:'numeric',month:'short'}).format(d); }
function nowPlus(days=0,h=7,m=30){ const d=new Date(); d.setDate(d.getDate()+days); d.setHours(h,m,0,0); return d; }
function safe(s){ return String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }

function routeForStudent(student){
  if(!student || student.mode==='explore') return null;
  if(student.assignedRouteId){const exact=DATA.routes.find(r=>r.id===student.assignedRouteId);if(exact)return exact;}
  const matches=DATA.routes.filter(r=>(r.uniId===student.uniId || r.uni===student.uni) && r.s==='Active');
  return matches[0] || null;
}
function routeParts(route){
  if(!route)return {origin:'Pickup area',destination:'University'}; const parts=(route.n||'Campus route').split('↔').map(x=>x.trim());
  const origin=route.startDistrict||route.startCity||route.startGov||parts[0]||'Pickup area'; return {origin:LANG==='en'?dataEn(origin):origin, destination:LANG==='en'?(route.uniEn||displayUniName(route.uni)):route.uni};
}
function driverForRoute(route, slot=0){
  const idx=Math.abs(parseInt((route.id||'1').replace(/\D/g,''),10)||1);
  return drivers[(idx+slot)%drivers.length];
}
function serviceId(route, date, slot){ return `${route.id}-${dateKey(date)}-${slot}`; }
function buildSchedules(){
  const out=[];
  const activeRoutes=DATA.routes.filter(r=>r.s==='Active');
  for(let day=0;day<7;day++){
    activeRoutes.forEach((route,ri)=>{
      [0,1].forEach(slot=>{
        const morning=slot===0;
        const dt=nowPlus(day,morning?7+(ri%3):14+(ri%3),morning?30:15);
        let d=driverForRoute(route,slot); if(route.id===DATA.users.find(u=>u.id==='STU001251')?.assignedRouteId && slot===0) d=drivers.find(x=>x.id==='DRV000074')||d;
        const p=routeParts(route);
        const cap=[24,45,55,60][ri%4];
        out.push({id:serviceId(route,dt,slot),routeId:route.id,route,driverId:d?.id,driver:d,date:dt,slot,capacity:cap,from:morning?p.origin:route.uni,to:morning?route.uni:p.origin,status:day===0&&ri%13===0?'Boarding':'Scheduled'});
      });
    });
  }
  return out;
}

function reservations(){ return store.get('reservations', seedReservations()); }
function seedReservations(){
  const map={};
  const seedStudents=(DATA.students||students).slice(0,100).map(s=>s.id);
  schedules.slice(0,110).forEach((svc,i)=>{
    const count=Math.min(svc.capacity-1, 3+(i%10));
    map[svc.id]=seedStudents.slice(0,count);
  });
  // Keep one believable full service for capacity handling.
  const full=schedules.find(s=>s.capacity>=45) || schedules[0];
  if(full) map[full.id]=seedStudents.slice(0,Math.min(full.capacity,seedStudents.length));
  return map;
}
function saveReservations(r){ store.set('reservations',r); }
function reservedUsers(serviceId){ return reservations()[serviceId]||[]; }
function hasSeat(serviceId,userId=currentUser?.id){ return reservedUsers(serviceId).includes(userId); }
function occupancy(service){ return reservedUsers(service.id).length; }
function servicesForStudent(student){ const r=routeForStudent(student); return r?schedules.filter(s=>s.routeId===r.id).slice(0,14):[]; }
function servicesForDriver(driver){ return schedules.filter(s=>s.driverId===driver.id).slice(0,18); }
function nextReservedService(student=currentUser){ return servicesForStudent(student).find(s=>hasSeat(s.id,student.id) && s.date>new Date()) || null; }
function nextStudentService(student=currentUser){ return servicesForStudent(student).find(s=>s.date>new Date()) || servicesForStudent(student)[0]; }

function notifications(userId){
  const all=store.get('notifications',{});
  if(!all[userId]){
    const u=DATA.users.find(x=>x.id===userId);
    all[userId]=seedNotifications(u);
    store.set('notifications',all);
  }
  return all[userId];
}
function seedNotifications(u){
  if(!u) return [];
  const base=[
    {id:'n1',type:'service',title:'Service updates are ready',message:'Your latest transport schedule is available in UniRide.',at:new Date(Date.now()-18*60*1000).toISOString(),read:false},
    {id:'n2',type:'info',title:'Profile details verified',message:'Your account details are synchronized with the transport system.',at:new Date(Date.now()-22*60*60*1000).toISOString(),read:true}
  ];
  if(u.role==='student') base.unshift({id:'n0',type:'reminder',title:'Reserve before you travel',message:'Reserve a seat for your assigned bus so the driver receives an accurate passenger count.',at:new Date(Date.now()-5*60*1000).toISOString(),read:false});
  if(u.role==='driver') base.unshift({id:'n0',type:'passengers',title:'Passenger manifest updated',message:'Open Passenger Manifest to view the latest reserved seat count.',at:new Date(Date.now()-7*60*1000).toISOString(),read:false});
  return base;
}
function addNotification(userId,title,message,type='info'){
  const all=store.get('notifications',{}); const list=all[userId]||seedNotifications(DATA.users.find(x=>x.id===userId));
  list.unshift({id:'n'+Date.now()+Math.random(),type,title,message,at:new Date().toISOString(),read:false}); all[userId]=list; store.set('notifications',all); updateNotificationDot();
}
function markAllRead(){ const all=store.get('notifications',{}); all[currentUser.id]=notifications(currentUser.id).map(n=>({...n,read:true})); store.set('notifications',all); updateNotificationDot(); render(); }
function updateNotificationDot(){ if(!currentUser)return; $('#notificationDot').hidden=!notifications(currentUser.id).some(n=>!n.read); }

function toast(title,message=''){
  const root=$('#toastRoot'); const el=document.createElement('div'); el.className='toast'; el.innerHTML=`${icon('check')}<div><strong>${safe(tr(title))}</strong>${message?`<span>${safe(tr(message))}</span>`:''}</div>`; root.appendChild(el); setTimeout(()=>{el.style.opacity='0';el.style.transform='translateX(18px)';setTimeout(()=>el.remove(),250)},3200);
}
function modal({title,message,iconName='bell',primary='Got it',secondary='',onPrimary,onSecondary}){
  const root=$('#modalRoot'); root.innerHTML=`<div class="modal-backdrop"><div class="modal"><div class="modal-icon">${icon(iconName)}</div><h3>${safe(tr(title))}</h3><p>${safe(tr(message))}</p><div class="modal-actions">${secondary?`<button class="ghost-btn" data-modal-secondary>${safe(tr(secondary))}</button>`:''}<button class="primary-btn" data-modal-primary>${safe(tr(primary))}</button></div></div></div>`;
  $('[data-modal-primary]',root).onclick=()=>{root.innerHTML='';onPrimary&&onPrimary();}; localizeTree(root); if(secondary)$('[data-modal-secondary]',root).onclick=()=>{root.innerHTML='';onSecondary&&onSecondary();};
}

function statusPill(status){
  const cls={Scheduled:'blue',Boarding:'amber',Departed:'purple',Completed:'green',Cancelled:'red',Active:'green',Inactive:'gray',Suspended:'red',Open:'red',Resolved:'green',InProgress:'amber',Full:'red',Pending:'amber'}[status]||'gray';
  return `<span class="status-pill status-${cls}">${safe(tr(status))}</span>`;
}
function kpi(iconName,value,label,color=''){ return `<div class="card hoverable kpi-card"><div class="kpi-icon ${color}">${icon(iconName)}</div><div><strong>${safe(value)}</strong><span>${safe(label)}</span></div></div>`; }
function empty(iconName,title,text){ return `<div class="empty-state"><div class="empty-icon">${icon(iconName)}</div><strong>${safe(title)}</strong><p>${safe(text)}</p></div>`; }
function table(headers,rows){ return `<div class="table-wrap"><table class="data-table"><thead><tr>${headers.map(h=>`<th>${safe(h)}</th>`).join('')}</tr></thead><tbody>${rows.join('')}</tbody></table></div>`; }
function barChart(items){ const max=Math.max(...items.map(x=>x[1]),1); return `<div class="bar-chart">${items.map(([k,v])=>`<div class="bar-item"><label title="${safe(k)}">${safe(displayDataValue(k))}</label><div class="bar-track"><span style="width:${(v/max)*100}%"></span></div><b>${fmtNumber(v)}</b></div>`).join('')}</div>`; }
function sparkBars(items){ const max=Math.max(...items.map(x=>x[1]),1); return `<div class="spark-bars">${items.map(([k,v])=>`<div class="spark-col" title="${safe(k)}: ${safe(v)}"><i style="height:${Math.max(4,v/max*130)}px"></i><span>${safe(k.slice(5))}</span></div>`).join('')}</div>`; }

function csvEscape(v){const x=String(v??'');return /[",\n]/.test(x)?'"'+x.replace(/"/g,'""')+'"':x;}
function downloadCsv(name,headers,rows){const csv='\ufeff'+[headers,...rows].map(r=>r.map(csvEscape).join(',')).join('\n');const blob=new Blob([csv],{type:'text/csv;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),500);toast('Export complete','CSV file downloaded.');}
function exportRecords(type){
 if(type==='trips')downloadCsv('uniride_latest_trips.csv',['TripID','University','DriverID','Passengers','Status','Date'],DATA.recent.slice(0,250).map(t=>[t.id,displayUniName(t.uni),t.dr,t.pax,t.s,t.dt]));
 if(type==='routes')downloadCsv('uniride_routes.csv',['RouteID','RouteName','University','Governorate','City','DistanceKm','DurationMin','Status'],DATA.routes.map(r=>[r.id,routeName(r),displayUniName(r.uni),dataEn(r.startGov),dataEn(r.startCity),r.km,r.min,r.s]));
 if(type==='support'){const custom=store.get('complaints',[]);downloadCsv('uniride_support.csv',['ID','StudentID','Category','Subject','Status','CreatedAt'],[...custom.map((c,i)=>['WEB-'+(i+1),c.userId,c.category,c.subject,c.status,c.at]),...(DATA.tickets||[]).slice(0,500).map(t=>[t.id,t.studentId||'',t.cat||'',t.sub||'',t.s||'',t.createdAt||''])]);}
 if(type==='routeRequests'){const rr=store.get('routeRequests',[]);downloadCsv('uniride_route_requests.csv',['RequestID','StudentID','RouteID','Status','CreatedAt'],rr.map(x=>[x.id,x.userId,x.routeId,x.status,x.at]));}
 if(type==='incidents'){const rr=store.get('driverReports',[]);downloadCsv('uniride_driver_reports.csv',['DriverID','Type','Severity','Details','CreatedAt'],rr.map(x=>[x.driverId,x.type,x.severity,x.details,x.at]));}
 if(type==='reservations')downloadCsv('uniride_reservations.csv',['ServiceID','RouteID','University','Departure','Capacity','Reserved'],schedules.map(s=>[s.id,s.routeId,displayUniName(s.route.uni),s.date.toISOString(),s.capacity,occupancy(s)]));
}

function injectIcons(root=document){ $$('[data-icon]',root).forEach(el=>{el.innerHTML=icon(el.dataset.icon);}); $$('[data-brand-mark]',root).forEach(el=>{el.innerHTML=brandMark();}); }
function setupIntro(){ const intro=$('#intro'); if(!intro)return; const mark=$('#introMark'); if(mark)mark.innerHTML=brandMark(); setTimeout(()=>intro.classList.add('done'),2600); }
function setupAuth(){
  const accounts=[
    ['2022111102','student','Farah Salah Adham','فرح صلاح أدهم'],
    ['2022143841','student','Amira Adam Gamal','أميرة آدم جمال'],
    ['UR-Z01-7152','driver','Abdel Nasser Hamdy Abdel Malak','عبد الناصر حمدي عبد الملاك'],
    ['UR-Z01-8835','driver','Adel Rami Abdallah','عادل رامي عبد الله'],
    ['staff','staff','Heba Fouad','هبة فؤاد'],
    ['admin','admin','System Administrator','مدير النظام']
  ];
  const grid=$('#accountAccessGrid');
  if(grid){
    const roleLabel={student:LANG==='ar'?'طالب':'Student',driver:LANG==='ar'?'سائق':'Driver',staff:LANG==='ar'?'موظف النقل':'Transport Staff',admin:LANG==='ar'?'مسؤول النظام':'Administrator'};
    grid.innerHTML=accounts.map(([login,role,en,ar])=>`<button class="account-card" type="button" data-account-login="${safe(login)}"><span class="account-card-copy"><strong>${safe(LANG==='ar'?ar:en)}</strong><small>${safe(roleLabel[role])} · ${safe(login)}</small></span><span class="account-card-arrow">${icon('arrow-right')}</span></button>`).join('');
    $$('[data-account-login]',grid).forEach(b=>b.onclick=()=>loginAsAccount(b.dataset.accountLogin));
  }
  const toggle=$('#togglePassword'); if(toggle)toggle.onclick=()=>{const p=$('#password');const show=p.type==='password';p.type=show?'text':'password';toggle.setAttribute('aria-label',show?'Hide password':'Show password');toggle.innerHTML=show?'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 3l18 18M10.6 10.7a2 2 0 002.7 2.7M9.9 4.2A10.8 10.8 0 0112 4c5.4 0 9 5 9 5a15.6 15.6 0 01-3.1 3.5M6.2 6.2C4.1 7.7 3 9 3 9s3.6 5 9 5c1.5 0 2.8-.4 4-1"/></svg>':'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z"/><circle cx="12" cy="12" r="2.5"/></svg>';};
  const form=$('#loginForm'); if(form)form.onsubmit=e=>{e.preventDefault();login();};
}
function loginAsAccount(loginId){
  const u=DATA.users.find(x=>x.login===loginId);
  const id=$('#loginId'),pw=$('#password'),err=$('#loginError');
  if(id) id.value=loginId;
  if(pw) pw.value=PASS;
  if(err) err.hidden=true;
  $$('.account-card').forEach(card=>card.classList.toggle('selected', card.dataset.accountLogin===loginId));
  if(!u && err){err.textContent=tr('Account not found. Check the ID and try again.');err.hidden=false;}
  if(id) id.focus();
}
function login(){
  const id=$('#loginId').value.trim(); const pw=$('#password').value; const err=$('#loginError'); err.hidden=true;
  const u=DATA.users.find(x=>x.login===id || x.email===id);
  if(!id||!pw){err.textContent=tr('Enter your account ID and password.');err.hidden=false;return;}
  if(!u){err.textContent=tr('Account not found. Check the ID and try again.');err.hidden=false;return;}
  if(pw!==PASS){err.textContent=tr('Incorrect password.');err.hidden=false;return;}
  currentUser={...u,name:store.get('profileName_'+u.id,u.name),email:store.get('profileEmail_'+u.id,u.email||'')};store.set('session',u.login); startApp();
}
function logout(){ store.set('session',null); currentUser=null; $('#app').hidden=true; if($('#publicSite'))$('#publicSite').hidden=true; $('#auth').hidden=false; $('#password').value=''; }

function startApp(){
  if($('#publicSite'))$('#publicSite').hidden=true; $('#auth').hidden=true; $('#app').hidden=false; currentView='home';
  $('#sidebarUser').innerHTML=`<strong>${safe(displayName(currentUser))}</strong><span>${safe(tr(ROLES[currentUser.role]))}</span>`;
  $('#topName').textContent=displayName(currentUser); $('#topRole').textContent=tr(ROLES[currentUser.role]); $('#topAvatar').textContent=initials(displayName(currentUser));
  buildNav(); updateNotificationDot(); navigate('home',false); maybeShowReminder();
}
function buildNav(){
  $('#sidebarNav').innerHTML=`<div class="nav-section-label">${tr('Workspace')}</div>`+navForUser(currentUser).map(([id,label,ic])=>`<button class="nav-item" data-nav="${id}"><span class="nav-icon">${icon(ic)}</span><span>${safe(tr(label))}</span></button>`).join('');
  bindNav();
}
function bindNav(){ $$('#sidebar [data-nav], #profileChip, #notificationBtn').forEach(el=>{el.onclick=()=>navigate(el.dataset.nav);}); $('#logoutBtn').onclick=logout; $('#menuBtn').onclick=()=>$('#sidebar').classList.toggle('open'); }
function navigate(view,close=true){ currentView=view; if(close)$('#sidebar').classList.remove('open'); render(); }
function setPage(title,kicker='Workspace'){ $('#pageTitle').textContent=tr(title); $('#pageKicker').textContent=tr(kicker); $$('.nav-item').forEach(x=>x.classList.toggle('active',x.dataset.nav===currentView)); }
function render(){
  if(!currentUser)return; const fn=VIEWS[currentUser.role]?.[currentView] || VIEWS[currentUser.role].home; const result=fn();
  setPage(result.title,result.kicker||ROLES[currentUser.role]); $('#view').innerHTML=`<div class="page-enter">${result.html}</div>`; injectIcons($('#view')); bindDynamic(); updateNotificationDot(); localizeTree($('#view'));
}
function bindDynamic(){
  $$('[data-action="reserve"]').forEach(b=>b.onclick=()=>reserveSeat(b.dataset.service));
  $$('[data-action="cancel-seat"]').forEach(b=>b.onclick=()=>cancelSeat(b.dataset.service));
  $$('[data-action="service-state"]').forEach(b=>b.onclick=()=>advanceService(b.dataset.service));
  $$('[data-action="ticket-resolve"]').forEach(b=>b.onclick=()=>resolveTicket(b.dataset.ticket));
  $$('[data-action="staff-ticket-open"]').forEach(b=>b.onclick=()=>openStaffTicket(b.dataset.ticket));
  $$('[data-action="account-toggle"]').forEach(b=>b.onclick=()=>toggleAccount(b.dataset.user));
  $$('[data-action="mark-read"]').forEach(b=>b.onclick=markAllRead);
  $$('[data-action="save-profile"]').forEach(b=>b.onclick=saveProfile);
  $$('[data-action="send-complaint"]').forEach(b=>b.onclick=sendComplaint);
  $$('[data-action="download-csv"]').forEach(b=>b.onclick=()=>exportRecords(b.dataset.export));
  $$('[data-action="open-complaint"]').forEach(b=>b.onclick=()=>openComplaint(b.dataset.complaint));
  $$('[data-action="route-detail"]').forEach(b=>b.onclick=()=>openRouteDetail(b.dataset.route));
  $$('[data-action="request-route"]').forEach(b=>b.onclick=()=>requestRouteAssignment(b.dataset.route));
  const rg=$('#routeGov'),ru=$('#routeUni'),rq=$('#routeSearch'); if(rg)rg.onchange=()=>{routeFilterState.gov=rg.value;render()}; if(ru)ru.onchange=()=>{routeFilterState.uni=ru.value;render()}; if(rq)rq.oninput=()=>{routeFilterState.q=rq.value;const q=routeFilterState.q.trim().toLowerCase();$$('[data-route-search]').forEach(card=>{card.hidden=!!q && !card.dataset.routeSearch.includes(q);});}; $$('[data-action="route-clear"]').forEach(b=>b.onclick=()=>{routeFilterState.gov='';routeFilterState.uni='';routeFilterState.q='';render()});
  $$('[data-action="send-report"]').forEach(b=>b.onclick=sendDriverReport);
  $$('[data-action="driver-start"]').forEach(b=>b.onclick=()=>driverStartTrip(b.dataset.service));
  $$('[data-action="driver-end"]').forEach(b=>b.onclick=()=>driverEndTrip(b.dataset.service));
  $$('[data-action="driver-manifest"]').forEach(b=>b.onclick=()=>openDriverManifest(b.dataset.service));
  $$('[data-action="driver-delay"]').forEach(b=>b.onclick=()=>openDelayReport(b.dataset.service));
  $$('[data-action="toggle-availability"]').forEach(b=>b.onclick=toggleDriverAvailability);

  $$('[data-action="send-announcement"]').forEach(b=>b.onclick=sendAnnouncement);
  $$('[data-action="save-settings"]').forEach(b=>b.onclick=()=>toast('Settings saved','System preferences were updated.'));
}

function reserveSeat(serviceId){
  const r=reservations(); r[serviceId]=r[serviceId]||[]; if(r[serviceId].includes(currentUser.id))return;
  const svc=schedules.find(s=>s.id===serviceId); if(!svc)return; if(r[serviceId].length>=svc.capacity){toast('Service is full','Choose another departure.');return;}
  r[serviceId].push(currentUser.id); saveReservations(r);
  addNotification(currentUser.id,'Seat reserved',`Your seat is saved for ${formatDate(svc.date)} at ${svc.date.toLocaleTimeString(locale(), {hour:'2-digit',minute:'2-digit'})}. Please arrive at your pickup point 10 minutes early.`,'reminder');
  if(svc.driverId) addNotification(svc.driverId,'Passenger count updated',`${currentUser.name} reserved a seat. Current manifest: ${r[serviceId].length}/${svc.capacity}.`,'passengers');
  modal({title:'Seat reserved',message:`Your place is saved. Please be at the pickup point 10 minutes before departure. A reminder was also added to Notifications.`,iconName:'seat',primary:'View my reservation',secondary:'Stay here',onPrimary:()=>navigate('home'),onSecondary:()=>render()});
}
function cancelSeat(serviceId){
  const r=reservations(); r[serviceId]=(r[serviceId]||[]).filter(id=>id!==currentUser.id); saveReservations(r); const svc=schedules.find(s=>s.id===serviceId);
  addNotification(currentUser.id,'Reservation cancelled',`Your seat for ${svc?formatDate(svc.date):'the service'} has been released.`,'info'); toast('Reservation cancelled','The seat is available to another student.'); render();
}
function maybeShowReminder(){
  if(currentUser.role!=='student')return; const svc=nextReservedService(); if(!svc)return; const seen=store.get('reminderSeen',{}); if(seen[svc.id])return;
  setTimeout(()=>modal({title:'Upcoming UniRide reminder',message:`Your reserved bus leaves ${formatDate(svc.date)} at ${svc.date.toLocaleTimeString(locale(), {hour:'2-digit',minute:'2-digit'})}. Please arrive 10 minutes early so the service can depart on time.`,iconName:'bell',primary:'I will be on time',secondary:'Open notifications',onPrimary:()=>{seen[svc.id]=true;store.set('reminderSeen',seen);},onSecondary:()=>{seen[svc.id]=true;store.set('reminderSeen',seen);navigate('notifications');}}),700);
}

function serviceCard(svc){
  const count=occupancy(svc), pct=Math.min(100,count/svc.capacity*100), reserved=hasSeat(svc.id), full=count>=svc.capacity;
  const vehicle=svc.capacity<=28?'Minibus':svc.capacity>=55?'Large coach':'University bus';
  return `<div class="schedule-card compact-service"><div class="schedule-time"><strong>${svc.date.toLocaleTimeString(locale(), {hour:'2-digit',minute:'2-digit'})}</strong><span>${formatDate(svc.date)}</span></div><div class="schedule-main"><h4>${safe(svc.from)} to ${safe(svc.to)}</h4><p>${safe(svc.route.id)} · ${safe(svc.driver?.name||'Driver pending')}</p><div class="schedule-meta"><span class="meta-chip">${icon('bus')} ${safe(vehicle)}</span><span class="meta-chip">${icon('seat')} ${count}/${svc.capacity}</span>${full?'<span class="status-pill status-red">'+tr('Full')+'</span>':statusPill(svc.status)}</div></div><div class="seat-action">${reserved?`<button class="ghost-btn compact-action" data-action="cancel-seat" data-service="${svc.id}">Release seat</button><div class="reserved-label">Seat reserved</div>`:full?`<button class="primary-btn compact-action" disabled>${tr('Full')}</button>`:`<button class="primary-btn compact-action" data-action="reserve" data-service="${svc.id}">${icon('seat')} Reserve seat</button>`}</div></div>`;
}
function nextTripCard(svc){
  if(!svc)return `<div class="next-trip-card"><span class="mini-label">Next service</span><strong>No seat reserved yet</strong><p>Open Reserve a seat to confirm your place.</p></div>`;
  const p=routeParts(svc.route); return `<div class="next-trip-card"><span class="mini-label">Reserved service</span><strong>${svc.date.toLocaleTimeString(locale(), {hour:'2-digit',minute:'2-digit'})}</strong><p>${safe(p.origin)} · ${safe(displayUniName(svc.route.uni))}</p><div class="next-trip-meta"><div><span class="mini-label">Date</span><strong style="font-size:.82rem">${formatDate(svc.date)}</strong></div><div><span class="mini-label">Pickup</span><strong style="font-size:.82rem">10 min early</strong></div></div></div>`;
}

const VIEWS = {student:{},driver:{},staff:{},admin:{}};

VIEWS.student.home=()=>{
  if(currentUser.mode==='explore'){
    const govs=governorateSummary().slice(0,8);
    return {title:'Student dashboard',kicker:'Explore transport',html:`<section class="hero-panel"><div class="hero-panel-copy"><span class="eyebrow">Find your university route</span><h1>Explore routes across Egypt.</h1><p>This student does not have a fixed route yet. Browse university routes by governorate, university and pickup area.</p><div class="hero-panel-actions"><button class="primary-btn" data-nav="explore">${icon('map')} Explore routes</button><button class="ghost-btn" data-nav="notifications">${icon('bell')} Notifications</button></div></div><div class="hero-panel-side"><div class="next-trip-card"><span class="mini-label">Network coverage</span><strong>${fmtNumber(DATA.kpi.routes)} routes</strong><p>${fmtNumber(DATA.kpi.universities)} universities · ${DATA.governorates.length} governorates represented</p></div></div></section><div class="grid grid-4 section-gap">${kpi('route',fmtNumber(DATA.kpi.routes),'Route records')}${kpi('building',fmtNumber(DATA.kpi.universities),'Universities','blue')}${kpi('map',DATA.governorates.length,'Governorates','amber')}${kpi('bell',notifications(currentUser.id).filter(n=>!n.read).length,'Unread updates','purple')}</div><div class="card section-gap"><div class="card-header"><div><h3>Browse by governorate</h3><p>Start with an area, then open the route explorer for full details.</p></div><button class="mini-btn primary" data-nav="explore">View all routes</button></div><div class="gov-pill-grid">${govs.map(([g,c])=>`<button class="gov-pill" data-nav="explore"><strong>${safe(dataEn(g))}</strong><span>${c} routes</span></button>`).join('')}</div></div>`};
  }
  const route=routeForStudent(currentUser), p=routeParts(route), services=servicesForStudent(currentUser), next=nextReservedService(), upcoming=services.filter(s=>s.date>new Date()).slice(0,3);
  const myReserved=services.filter(s=>hasSeat(s.id)).length;
  return {title:'Student dashboard',kicker:'Your transport',html:`<section class="hero-panel"><div class="hero-panel-copy"><span class="eyebrow">Assigned university transport</span><h1>Your route is ready when you are.</h1><p>Reserve your seat before travelling. UniRide will remind you to arrive early, and your reservation automatically updates the driver’s passenger manifest.</p><div class="hero-panel-actions"><button class="primary-btn" data-nav="reserve">${icon('seat')} Reserve a seat</button><button class="ghost-btn" data-nav="route">${icon('route')} View route</button></div></div><div class="hero-panel-side">${nextTripCard(next)}</div></section><div class="grid grid-4 section-gap">${kpi('route',route.id,'Assigned route')}${kpi('seat',myReserved,'Reserved services','blue')}${kpi('clock',Math.round(route.min)+' min','Estimated route','amber')}${kpi('bell',notifications(currentUser.id).filter(n=>!n.read).length,'Unread updates','purple')}</div><div class="grid grid-2 section-gap"><div class="card"><div class="card-header"><div><h3>Upcoming services</h3><p>Your next scheduled departures from the assigned route.</p></div><button class="mini-btn primary" data-nav="reserve">View all</button></div><div class="schedule-list">${upcoming.length?upcoming.map(serviceCard).join(''):empty('calendar','No upcoming services','No scheduled service was found for this route.')}</div></div><div class="card hoverable"><div class="card-header"><div><h3>Your assigned route</h3><p>${safe(displayUniName(route.uni))}</p></div>${statusPill(route.s)}</div><div class="route-line"><div class="stop active"><strong>${safe(p.origin)}</strong><span>Your assigned pickup area</span></div><div class="stop"><strong>${safe(LANG==='en'?'Shared checkpoint':'نقطة تجمع مشتركة')}</strong><span>${safe(LANG==='en'?'Intermediate pickup':'محطة ركوب وسيطة')}</span></div><div class="stop"><strong>${safe(displayUniName(route.uni))}</strong><span>University arrival</span></div></div><div class="divider"></div><div class="stat-row"><strong>Operating days</strong><span>${safe(dataEn(route.days))}</span></div><div class="stat-row"><strong>Distance</strong><span>${route.km} km</span></div></div></div>`};
};
VIEWS.student.reserve=()=>{const services=servicesForStudent(currentUser);if(!services.length)return VIEWS.student.explore();return {title:'Reserve a seat',kicker:'Student services',html:`<div class="grid grid-3">${kpi('calendar','7 days','Schedule window')}${kpi('seat',services.filter(s=>hasSeat(s.id)).length,'Your reservations','blue')}${kpi('bell','10 min','Arrival reminder','amber')}</div><div class="card section-gap"><div class="card-header"><div><h3>Available departures</h3><p>Your route is assigned by the university. Choose the services you will actually use.</p></div></div><div class="schedule-list">${services.map(serviceCard).join('')}</div></div>`};};
VIEWS.student.route=()=>{const route=routeForStudent(currentUser);if(!route)return VIEWS.student.explore();const p=routeParts(route),next=nextStudentService();return {title:'My route & stops',kicker:'Assigned route',html:`<div class="grid grid-2"><div class="card hoverable"><div class="card-header"><div><h3>${safe(routeName(route))}</h3><p>${safe(route.id)} · ${safe(displayUniName(route.uni))}</p></div>${statusPill(route.s)}</div><div class="route-line"><div class="stop active"><strong>${safe(p.origin)}</strong><span>Assigned pickup area</span></div><div class="stop"><strong>${safe(dataEn(route.startCity||route.startGov))}</strong><span>Route checkpoint</span></div><div class="stop"><strong>${safe(dataEn(route.endDistrict||route.endCity))}</strong><span>Campus access area</span></div><div class="stop"><strong>${safe(displayUniName(route.uni))}</strong><span>Final stop</span></div></div></div><div class="card"><div class="card-header"><div><h3>Route information</h3><p>University transport assignment</p></div></div><div class="stat-row"><strong>Next departure</strong><span>${next?formatDate(next.date)+' · '+next.date.toLocaleTimeString(locale(),{hour:'2-digit',minute:'2-digit'}):'—'}</span></div><div class="stat-row"><strong>Distance</strong><span>${route.km} km</span></div><div class="stat-row"><strong>Estimated duration</strong><span>${Math.round(route.min)} min</span></div><div class="stat-row"><strong>Operating days</strong><span>${safe(dataEn(route.days))}</span></div><div class="stat-row"><strong>Pickup rule</strong><span>Arrive 10 minutes early</span></div><div class="divider"></div><button class="ghost-btn" data-nav="explore">${icon('map')} Explore other routes</button></div></div>`};};
VIEWS.student.explore=()=>routeExplorerView();
VIEWS.student.notifications=notificationsView;
VIEWS.student.complaints=()=>{const local=store.get('complaints',[]).filter(x=>x.userId===currentUser.id);const excel=(DATA.supportTickets||[]).filter(x=>x.studentId===currentUser.id).slice(0,8).map(x=>({...x,_excel:true,subject:x.subjectAr,category:x.categoryAr,details:x.descriptionAr,status:x.status,at:x.createdAt}));const mine=[...local,...excel];return {title:'Support & feedback',kicker:'Student support',html:`<div class="grid grid-2"><div class="card"><div class="card-header"><div><h3>Send a request</h3><p>Report a route, service, accessibility or app issue.</p></div></div><div class="form-grid"><div><label>Category</label><select id="complaintCategory"><option>Route or stop</option><option>Service delay</option><option>Accessibility</option><option>App issue</option><option>Suggestion</option></select></div><div><label>Priority</label><select id="complaintPriority"><option>Normal</option><option>High</option></select></div><div class="full"><label>Subject</label><input id="complaintSubject" placeholder="Short description"></div><div class="full"><label>Details</label><textarea id="complaintDetails" rows="5" placeholder="Tell the transport team what happened"></textarea></div></div><button class="primary-btn" data-action="send-complaint" style="margin-top:1rem">${icon('message-square')} Send request</button></div><div class="card"><div class="card-header"><div><h3>Your requests</h3><p>Click any request to open its full details and status.</p></div></div>${mine.length?mine.map((c,i)=>`<button class="support-request" data-action="open-complaint" data-complaint="${safe(c._excel?'EXCEL:'+c.id:'LOCAL:'+i)}"><span class="support-request-copy"><strong>${safe(c.subject)}</strong><span>${safe(LANG==='en'?dataEn(c.category):c.category)} · ${safe(c.status||'Open')}</span></span><span class="chev">${icon('chevron-down')}</span></button>`).join(''):empty('message-square','No support requests','Your submitted requests will appear here.')}</div></div>`};};

const routeFilterState={gov:'',uni:'',q:''};
function governorateSummary(){const c={};DATA.routes.filter(r=>r.s==='Active').forEach(r=>{c[r.startGov]=(c[r.startGov]||0)+1});return Object.entries(c).sort((a,b)=>b[1]-a[1]);}
function routeExplorerView(){
  const govs=[...new Set(DATA.routes.map(r=>r.startGov).filter(Boolean))].sort();
  const unis=DATA.universities||[];
  let list=DATA.routes.filter(r=>r.s==='Active');
  const fg=routeFilterState.gov,fu=routeFilterState.uni,q=routeFilterState.q.toLowerCase();
  if(fg)list=list.filter(r=>r.startGov===fg); if(fu)list=list.filter(r=>r.uniId===fu); if(q)list=list.filter(r=>[r.n,r.startGov,r.startCity,r.startDistrict,r.uni,r.uniEn].some(v=>String(v||'').toLowerCase().includes(q)));
  list=list.slice(0,80);
  return {title:'Explore routes',kicker:'University route network',html:`<div class="card"><div class="card-header"><div><h3>Find a university route</h3><p>Browse by governorate, university, city, or pickup area.</p></div><span class="status-pill status-green">${fmtNumber(DATA.kpi.routes)} routes</span></div><div class="route-explorer-toolbar"><div><label>Governorate</label><select id="routeGov"><option value="">All governorates</option>${govs.map(g=>`<option value="${safe(g)}" ${fg===g?'selected':''}>${safe(dataEn(g))}</option>`).join('')}</select></div><div><label>University</label><select id="routeUni"><option value="">All universities</option>${unis.map(u=>`<option value="${u.id}" ${fu===u.id?'selected':''}>${safe(LANG==='en'?u.nameEn:u.nameAr)}</option>`).join('')}</select></div><div class="route-search"><label>Search</label><input id="routeSearch" value="${safe(routeFilterState.q)}" placeholder="Route, city or pickup area"></div><button class="ghost-btn" data-action="route-clear">${icon('refresh')} Clear</button></div><div class="route-results-head"><div><strong>${list.length}</strong> routes shown</div><span class="muted">Open a route to review stops, timing, and assignment options.</span></div><div class="route-results">${list.map(routeExplorerCard).join('')}</div></div>`};
}
function routeExplorerCard(r){const origin=LANG==='en'?dataEn(r.startDistrict||r.startCity||r.startGov):(r.startDistrict||r.startCity||r.startGov);const searchText=[routeName(r),origin,LANG==='en'?r.uniEn:r.uni,dataEn(r.startGov),dataEn(r.startCity)].join(' ').toLowerCase();return `<article class="route-card cleaner-route" data-route-search="${safe(searchText)}"><div class="route-card-top"><div><h4>${safe(routeName(r))}</h4><p>${safe(origin)} · ${safe(LANG==='en'?r.uniEn:r.uni)}</p></div>${statusPill(r.s)}</div><div class="route-card-meta"><span class="meta-chip">${icon('map')} ${safe(LANG==='en'?dataEn(r.startGov):r.startGov)}</span><span class="meta-chip">${icon('clock')} ${Math.round(r.min)} min</span><span class="meta-chip">${icon('route')} ${r.km} km</span></div><div class="route-card-actions"><button class="primary-btn compact-action" data-action="route-detail" data-route="${r.id}">View route</button></div></article>`;}
function openRouteDetail(id){const r=DATA.routes.find(x=>x.id===id);if(!r)return;const canRequest=currentUser?.role==='student'&&currentUser.mode==='explore';modal({title:routeName(r),message:`${LANG==='en'?dataEn(r.startDistrict||r.startCity||r.startGov):(r.startDistrict||r.startCity||r.startGov)} · ${r.km} km · ${Math.round(r.min)} min · ${LANG==='en'?r.uniEn:r.uni}`,iconName:'route',primary:'Close',secondary:canRequest?'Request assignment':'',onSecondary:()=>requestRouteAssignment(id)});}
function requestRouteAssignment(id){
  const requests=store.get('routeRequests',[]);
  const existing=requests.find(x=>x.userId===currentUser.id && x.routeId===id && x.status!=='Resolved');
  if(!existing) requests.unshift({id:'RR-'+Date.now(),userId:currentUser.id,routeId:id,status:'Pending',at:new Date().toISOString()});
  store.set('routeRequests',requests);
  addNotification(currentUser.id,'Route request sent','Transportation Staff received your route assignment request.','info');
  toast('Request sent','Your route assignment request is pending review.');
}
function openComplaint(ref){let c;if(ref.startsWith('EXCEL:')){c=(DATA.supportTickets||[]).find(x=>x.id===ref.slice(6));if(c)c={subject:c.subjectAr,details:c.descriptionAr,category:c.categoryAr,status:c.status,resolution:c.resolutionAr||''};}else{const i=parseInt(ref.split(':')[1],10);c=store.get('complaints',[]).filter(x=>x.userId===currentUser.id)[i];}if(!c)return;const msg=`${LANG==='en'?dataEn(c.category):c.category} · ${tr(c.status||'Open')}\n\n${c.details||''}${c.resolution?`\n\n${LANG==='en'?'Resolution':'الحل'}: ${c.resolution}`:''}`;modal({title:c.subject||'Support request',message:msg,iconName:'message-square',primary:'Close'});}

function driverServiceCard(s){
  const status=getServiceStatus(s), count=occupancy(s), running=status==='InProgress', done=status==='Completed';
  const vehicle=s.capacity<=28?'Minibus':s.capacity>=55?'Large coach':'University bus';
  return `<article class="driver-service-card"><div class="driver-service-summary"><div><span class="mini-label">${formatDate(s.date)} · ${s.date.toLocaleTimeString(locale(),{hour:'2-digit',minute:'2-digit'})}</span><h4>${safe(routeName(s.route))}</h4><p>${safe(displayUniName(s.route.uni))}</p></div>${statusPill(status)}</div><div class="driver-service-meta"><span>${icon('users')} ${count}/${s.capacity}</span><span>${icon('bus')} ${safe(vehicle)}</span><span>${icon('clock')} ${Math.round(s.route.min)} min</span></div><div class="driver-action-row">${!running&&!done?`<button class="primary-btn compact-action" data-action="driver-start" data-service="${s.id}">Start trip</button>`:''}${running?`<button class="primary-btn compact-action" data-action="driver-end" data-service="${s.id}">End trip</button>`:''}<button class="ghost-btn compact-action" data-action="driver-manifest" data-service="${s.id}">Manifest</button><button class="ghost-btn compact-action" data-action="route-detail" data-route="${s.routeId}">Route</button>${!done?`<button class="text-btn" data-action="driver-delay" data-service="${s.id}">Report delay</button>`:''}</div></article>`;
}
function manifestForService(service,compact=false){
  const ids=reservedUsers(service.id), users=ids.map(uid=>DATA.users.find(u=>u.id===uid)).filter(Boolean);
  if(!users.length) return empty('users','No reservations yet','Passenger reservations will appear automatically.');
  if(compact) return `<div class="manifest-compact">${users.slice(0,6).map(u=>`<div class="stat-row"><div><strong>${safe(displayName(u))}</strong><span style="display:block">${safe(u.login||u.id)}</span></div><span>${safe(routeParts(service.route).origin)}</span></div>`).join('')}${users.length>6?`<div class="muted">+${users.length-6} more passengers</div>`:''}</div>`;
  return table(['Student','ID','Pickup','Status'],users.map(u=>`<tr><td>${safe(displayName(u))}</td><td>${safe(u.login||u.id)}</td><td>${safe(routeParts(service.route).origin)}</td><td>${statusPill('Active')}</td></tr>`));
}

function notificationsView(){const list=notifications(currentUser.id);return {title:'Notifications',kicker:'Updates & reminders',html:`<div class="card"><div class="card-header"><div><h3>Notifications</h3><p>Seat reminders, service changes and operational updates.</p></div><button class="ghost-btn" data-action="mark-read">${icon('check')} Mark all read</button></div><div class="notification-list">${list.map(n=>`<div class="notification-item ${n.read?'':'unread'}"><div class="notification-icon">${icon(n.type==='reminder'?'clock':n.type==='passengers'?'users':n.type==='service'?'bus':'bell')}</div><div><h4>${safe(n.title)}</h4><p>${safe(n.message)}</p></div><time>${new Date(n.at).toLocaleString(locale(), {month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'})}</time></div>`).join('')}</div></div>`};}

VIEWS.driver.home=()=>{if(currentUser.mode==='available'){return {title:'Driver overview',kicker:'Availability',html:`<section class="hero-panel"><div class="hero-panel-copy"><span class="eyebrow">Available driver</span><h1>Choose the areas you can serve.</h1><p>This driver has no fixed service right now, so the route network and availability view are shown instead of an empty passenger manifest.</p><div class="hero-panel-actions"><button class="primary-btn" data-nav="network">${icon('route')} Browse route network</button><button class="ghost-btn" data-nav="availability">${icon('calendar')} Availability</button></div></div><div class="hero-panel-side"><div class="next-trip-card"><span class="mini-label">Current status</span><strong>${safe(tr(currentUser.availability||'Available'))}</strong><p>${safe(dataEn(currentUser.gov||''))} · ${safe(dataEn(currentUser.city||''))}</p></div></div></section><div class="grid grid-4 section-gap">${kpi('route',fmtNumber(DATA.kpi.routes),'Route records')}${kpi('building',fmtNumber(DATA.kpi.universities),'Universities','blue')}${kpi('star',currentUser.rating||'—','Driver rating','amber')}${kpi('check',fmtNumber(currentUser.done||0),'Completed services','purple')}</div>`};}
const svcs=servicesForDriver(currentUser),next=svcs.find(s=>s.date>new Date())||svcs[0], count=next?occupancy(next):0;return {title:'Driver overview',kicker:'Today’s service',html:`<section class="hero-panel"><div class="hero-panel-copy"><span class="eyebrow">Driver workspace</span><h1>Know who is riding before you depart.</h1><p>Seat reservations feed directly into your passenger manifest so you can check occupancy and leave on time.</p><div class="hero-panel-actions"><button class="primary-btn" data-nav="passengers">${icon('users')} Open passenger manifest</button><button class="ghost-btn" data-nav="trips">${icon('calendar')} Assigned services</button></div></div><div class="hero-panel-side">${next?`<div class="next-trip-card"><span class="mini-label">Next assigned service</span><strong>${next.date.toLocaleTimeString(locale(),{hour:'2-digit',minute:'2-digit'})}</strong><p>${safe(LANG==='en'?next.route.uniEn:next.route.uni)}</p><div class="next-trip-meta"><div><span class="mini-label">Reserved</span><strong style="font-size:.82rem">${count}/${next.capacity} students</strong></div><div><span class="mini-label">Status</span><strong style="font-size:.82rem">${tr(next.status)}</strong></div></div></div>`:''}</div></section><div class="grid grid-4 section-gap">${kpi('users',count,'Reserved students')}${kpi('seat',next?next.capacity:currentUser.capacity||0,'Vehicle capacity','blue')}${kpi('star',currentUser.rating||'4.8','Driver rating','amber')}${kpi('check',fmtNumber(currentUser.done||0),'Completed services','purple')}</div><div class="grid grid-2 section-gap"><div class="card"><div class="card-header"><div><h3>Next services</h3><p>Your assigned university departures.</p></div></div><div class="schedule-list">${svcs.slice(0,3).map(driverServiceCard).join('')}</div></div><div class="card"><div class="card-header"><div><h3>Passenger readiness</h3><p>Reserved seats for the next service.</p></div></div>${next?manifestForService(next,true):empty('users','No service assigned','Passenger data appears with an assigned service.')}</div></div>`};};
VIEWS.driver.trips=()=>{const svcs=servicesForDriver(currentUser);return {title:'Assigned services',kicker:'Driver schedule',html:`<div class="card"><div class="card-header"><div><h3>Upcoming assigned services</h3><p>Passenger counts update as students reserve or release seats.</p></div></div><div class="schedule-list">${svcs.map(driverServiceCard).join('')}</div></div>`};};
VIEWS.driver.passengers=()=>{const svcs=servicesForDriver(currentUser), selected=svcs.find(s=>s.date>new Date())||svcs[0];return {title:'Passenger manifest',kicker:'Reserved students',html:`<div class="grid grid-3">${kpi('users',selected?occupancy(selected):0,'Reserved students')}${kpi('seat',selected?selected.capacity:0,'Seat capacity','blue')}${kpi('clock',selected?selected.date.toLocaleTimeString(locale(),{hour:'2-digit',minute:'2-digit'}):'—','Departure','amber')}</div><div class="card section-gap"><div class="card-header"><div><h3>${selected?safe(selected.route.uni):'No service'}</h3><p>${selected?`${safe(selected.from)} to ${safe(selected.to)}`:''}</p></div>${selected?statusPill(selected.status):''}</div>${selected?manifestForService(selected):empty('users','No service assigned','There is no passenger manifest available.')}</div>`};};
VIEWS.driver.report=()=>({title:'Report an issue',kicker:'Driver support',html:`<div class="card" style="max-width:700px"><div class="card-header"><div><h3>Operational report</h3><p>Notify transport staff about a delay, vehicle issue, incident or route obstruction.</p></div></div><div class="form-grid"><div><label>Report type</label><select id="driverReportType"><option>Delay</option><option>Vehicle issue</option><option>Road obstruction</option><option>Incident</option></select></div><div><label>Severity</label><select id="driverReportSeverity"><option>Normal</option><option>High</option><option>Critical</option></select></div><div class="full"><label>Details</label><textarea id="driverReportDetails" rows="6" placeholder="Give the transport team enough detail to act quickly"></textarea></div></div><button class="primary-btn" data-action="send-report" style="margin-top:1rem">${icon('alert')} Submit report</button></div>`});
VIEWS.driver.notifications=notificationsView;


VIEWS.driver.network=()=>({title:'Route network',kicker:'University routes',html:routeExplorerView().html});
VIEWS.driver.availability=()=>{const state=store.get('driverAvailabilityState',{});const current=state[currentUser.id]||currentUser.availability||'Available';const rows=(DATA.driverAvailability||[]).filter(x=>x.driverId===currentUser.id).slice(-8).reverse();return {title:'Availability',kicker:'Driver schedule',html:`<div class="grid grid-2 driver-clean-grid"><div class="card"><div class="card-header"><div><h3>Current availability</h3><p>Control whether Transportation Staff can assign you to a service.</p></div>${statusPill(current==='Available'?'Active':'Inactive')}</div><div class="availability-focus"><strong>${safe(tr(current))}</strong><span>${safe(LANG==='ar'?(currentUser.gov||'') : dataEn(currentUser.gov||''))}</span></div><button class="primary-btn compact-action" data-action="toggle-availability">${current==='Available'?'Set unavailable':'Set available'}</button></div><div class="card"><div class="card-header"><div><h3>Recent availability</h3><p>Your latest recorded availability entries.</p></div></div>${rows.length?table(['Status','Max trips','Location'],rows.map(x=>`<tr><td>${statusPill(x.status==='Available'?'Active':'Inactive')}</td><td>${x.maxTrips}</td><td>${safe(x.locationId||'—')}</td></tr>`)):empty('calendar','No availability records','Your availability changes will appear here.')}</div></div>`};};

VIEWS.staff.home=()=>{const totalReserved=Object.values(reservations()).reduce((a,b)=>a+b.length,0),today=schedules.filter(s=>dateKey(s.date)===dateKey(new Date())).length;return {title:'Operations overview',kicker:'Transport staff',html:`<div class="grid grid-4">${kpi('bus',today,'Services today')}${kpi('users',totalReserved,'Seat reservations','blue')}${kpi('route',DATA.kpi.routes,'Route records','amber')}${kpi('activity',DATA.kpi.active,'Live operations','purple')}</div><div class="grid grid-2 section-gap"><div class="card"><div class="card-header"><div><h3>Completed services trend</h3><p>Transport activity by month.</p></div></div>${sparkBars(DATA.kpi.mon.slice(-12))}</div><div class="card"><div class="card-header"><div><h3>Top universities</h3><p>Highest recorded transport activity.</p></div></div>${barChart(DATA.kpi.topu.slice(0,6))}</div><div class="card"><div class="card-header"><div><h3>Operational issues</h3><p>Operational support categories.</p></div></div>${barChart(Object.entries(DATA.kpi.issues))}</div><div class="card"><div class="card-header"><div><h3>Capacity watch</h3><p>Services with the highest current reservation percentage.</p></div></div>${capacityWatch()}</div></div>`};};
function capacityWatch(){return schedules.slice(0,100).map(s=>({...s,p:occupancy(s)/s.capacity})).sort((a,b)=>b.p-a.p).slice(0,6).map(s=>`<div class="stat-row"><div><strong>${safe(s.route.id)} · ${safe(s.route.uni)}</strong><span style="display:block">${formatDate(s.date)} ${s.date.toLocaleTimeString(locale(),{hour:'2-digit',minute:'2-digit'})}</span></div><span>${occupancy(s)}/${s.capacity}</span></div>`).join('');}
VIEWS.staff.services=()=>{const list=schedules.filter(s=>dateKey(s.date)<=dateKey(nowPlus(1))).slice(0,36);return {title:'Service operations',kicker:'Live & upcoming',html:`<div class="card"><div class="card-header"><div><h3>Service board</h3><p>Advance service states and monitor reserved passenger counts.</p></div></div>${table(['Service','University','Departure','Driver','Reserved','Status','Action'],list.map(s=>`<tr><td>${safe(s.id.slice(0,18))}</td><td>${safe(s.route.uni)}</td><td>${formatDate(s.date)} ${s.date.toLocaleTimeString(locale(),{hour:'2-digit',minute:'2-digit'})}</td><td>${safe(s.driver?.name||'Pending')}</td><td>${occupancy(s)}/${s.capacity}</td><td>${statusPill(s.status)}</td><td><button class="mini-btn primary" data-action="service-state" data-service="${s.id}">Advance</button></td></tr>`))}</div>`};};
VIEWS.staff.routes=()=>{const rows=DATA.routes.slice(0,60).map((r,i)=>{const sample=schedules.find(s=>s.routeId===r.id),occ=sample?occupancy(sample):0,cap=sample?.capacity||[24,45,55,60][i%4];return `<tr><td>${safe(r.id)}</td><td>${safe(r.n)}</td><td>${safe(displayUniName(r.uni))}</td><td>${r.km} km</td><td>${Math.round(r.min)} min</td><td>${occ}/${cap}</td><td>${statusPill(r.s)}</td></tr>`});return {title:'Routes & capacity',kicker:'Network management',html:`<div class="card"><div class="card-header"><div><h3>Route network</h3><p>University route records with capacity and service details.</p></div></div>${table(['Route','Route name','University','Distance','Duration','Reserved / seats','Status'],rows)}</div>`};};
VIEWS.staff.announcements=()=>{const sent=store.get('announcements',[]);return {title:'Announcements',kicker:'Communication',html:`<div class="grid grid-2"><div class="card"><div class="card-header"><div><h3>New announcement</h3><p>Send a service update to students or drivers.</p></div></div><label>Audience</label><select id="announcementAudience"><option>All students</option><option>All drivers</option><option>Everyone</option></select><label>Title</label><input id="announcementTitle" placeholder="Service update"><label>Message</label><textarea id="announcementMessage" rows="5" placeholder="Write a clear transport update"></textarea><button class="primary-btn" data-action="send-announcement" style="margin-top:1rem">${icon('megaphone')} Send announcement</button></div><div class="card"><div class="card-header"><div><h3>Recent announcements</h3><p>Messages sent from UniRide.</p></div></div>${sent.length?sent.map(a=>`<div class="stat-row"><div><strong>${safe(a.title)}</strong><span style="display:block">${safe(a.audience)} · ${new Date(a.at).toLocaleString(locale())}</span></div>${statusPill('Sent')}</div>`).join(''):empty('megaphone','Nothing sent yet','Announcements sent from this page will appear here.')}</div></div>`};};
VIEWS.staff.tickets=()=>{const custom=store.get('complaints',[]);const resolved=store.get('resolvedTickets',{});const base=DATA.tickets.slice(0,16).map(t=>({id:t.id||'TK-'+Math.random(),category:t.cat||'Support',subject:t.sub||'Student support request',status:resolved[t.id]?'Resolved':(t.s||'Open')}));const routeReqs=store.get('routeRequests',[]).map((r,i)=>{const route=DATA.routes.find(x=>x.id===r.routeId),student=DATA.users.find(x=>x.id===r.userId);return {id:'ROUTE-'+i,category:'Route assignment',subject:`${student?displayName(student):r.userId} · ${route?routeName(route):r.routeId}`,status:r.status||'Pending'};});const all=[...custom.map((c,i)=>({id:'LOCAL-'+i,category:c.category,subject:c.subject,status:c.status})),...routeReqs,...base];return {title:'Student support',kicker:'Support queue',html:`<div class="card"><div class="card-header"><div><h3>Support requests</h3><p>Student feedback and operational issues.</p></div></div>${table(['ID','Category','Subject','Status','Action'],all.map(t=>`<tr><td>${safe(t.id)}</td><td>${safe(t.category)}</td><td>${safe(t.subject)}</td><td>${statusPill(t.status)}</td><td><button class="mini-btn" data-action="staff-ticket-open" data-ticket="${safe(t.id)}">Open</button>${t.status==='Resolved'?'':` <button class="mini-btn primary" data-action="ticket-resolve" data-ticket="${safe(t.id)}">Resolve</button>`}</td></tr>`))}</div>`};};
VIEWS.staff.reports=()=>({title:'Reports',kicker:'Transport analytics',html:`<div class="grid grid-2"><div class="card"><div class="card-header"><div><h3>Service volume</h3><p>Completed transport services by month.</p></div></div>${sparkBars(DATA.kpi.mon.slice(-12))}</div><div class="card"><div class="card-header"><div><h3>University activity</h3><p>Top institutions by recorded transport usage.</p></div></div>${barChart(DATA.kpi.topu.slice(0,6))}</div><div class="card"><div class="card-header"><div><h3>Reservation snapshot</h3><p>Current seat-reservation utilization.</p></div></div>${barChart(schedules.slice(0,24).map(s=>[s.route.id,occupancy(s)]).slice(0,8))}</div><div class="card"><div class="card-header"><div><h3>Support issue mix</h3><p>Operational issue categories only.</p></div></div>${barChart(Object.entries(DATA.kpi.issues))}</div></div>`});
VIEWS.staff.notifications=notificationsView;


function recordsExportView(){
  const complaintCount=store.get('complaints',[]).length, reportCount=store.get('driverReports',[]).length;
  const cards=[['trips','bus','Trips',DATA.recent.length],['routes','route','Routes',DATA.routes.length],['reservations','seat','Reservations',Object.values(reservations()).reduce((a,b)=>a+b.length,0)],['support','message-square','Complaints',complaintCount],['routeRequests','route','Route requests',store.get('routeRequests',[]).length],['incidents','alert','Driver reports',reportCount]];
  return {title:'Records export',kicker:'Transport records',html:`<div class="card"><div class="card-header"><div><h3>Latest records</h3><p>Download current UniRide records as CSV files.</p></div></div><div class="export-grid">${cards.map(([type,ic,label,count])=>`<div class="export-card"><div class="kpi-icon">${icon(ic)}</div><div><strong>${fmtNumber(count)}</strong><span>${label}</span></div><button class="ghost-btn compact-action" data-action="download-csv" data-export="${type}">Download CSV</button></div>`).join('')}</div><div class="stat-row"><strong>Driver reports</strong><span>${fmtNumber(reportCount)}</span></div></div>`};
}
VIEWS.staff.data=recordsExportView;
VIEWS.admin.data=recordsExportView;

VIEWS.admin.home=()=>({title:'System overview',kicker:'Administration',html:`<div class="grid grid-4">${kpi('users',fmtNumber(DATA.kpi.students),'Student accounts')}${kpi('user-circle',fmtNumber(DATA.kpi.drivers),'Driver accounts','blue')}${kpi('building',DATA.kpi.unis,'Universities','amber')}${kpi('route',DATA.kpi.routes,'Route records','purple')}</div><div class="grid grid-2 section-gap"><div class="card"><div class="card-header"><div><h3>Student account status</h3><p>Current student account-state distribution.</p></div></div>${barChart(Object.entries(DATA.kpi.acc))}</div><div class="card"><div class="card-header"><div><h3>Driver account status</h3><p>Driver access distribution.</p></div></div>${barChart(Object.entries(DATA.kpi.dacc))}</div><div class="card"><div class="card-header"><div><h3>System health</h3><p>Application status.</p></div></div><div class="stat-row"><strong>Authentication</strong>${statusPill('Active')}</div><div class="stat-row"><strong>Reservation service</strong>${statusPill('Active')}</div><div class="stat-row"><strong>Notifications</strong>${statusPill('Active')}</div><div class="stat-row"><strong>Data synchronization</strong>${statusPill('Active')}</div></div><div class="card"><div class="card-header"><div><h3>Recent activity</h3><p>Latest stored transport records.</p></div></div>${DATA.recent.slice(0,6).map(t=>`<div class="stat-row"><div><strong>${safe(t.id)}</strong><span style="display:block">${safe(displayUniName(t.uni))}</span></div>${statusPill(t.s==='Completed'?'Completed':'Active')}</div>`).join('')}</div></div>`});
VIEWS.admin.accounts=()=>{const states=store.get('accountStates',{});return {title:'Accounts',kicker:'Identity management',html:`<div class="card"><div class="card-header"><div><h3>Accounts</h3><p>Students, drivers, transport staff and system administrators.</p></div></div>${table(['ID','Name','Role','Email','Status','Action'],DATA.users.map(u=>{const st=states[u.id]||'Active';return `<tr><td>${safe(u.login)}</td><td>${safe(displayName(u))}</td><td>${safe(ROLES[u.role])}</td><td>${safe(u.email||'')}</td><td>${statusPill(st)}</td><td><button class="mini-btn ${st==='Active'?'danger':'primary'}" data-action="account-toggle" data-user="${u.id}">${st==='Active'?'Suspend':'Activate'}</button></td></tr>`}))}</div>`};};
VIEWS.admin.roles=()=>({title:'Roles & access',kicker:'Permissions',html:`<div class="grid grid-2">${Object.entries({Student:'Assigned route, seat reservation, reminders, notifications, profile and support.',Driver:'Assigned services, passenger counts, manifests, service status and incident reporting.','Transport Staff':'Routes, capacity, operations, announcements, student support and analytics.','System Admin':'Accounts, permissions, system settings, activity and access controls.'}).map(([r,d])=>`<div class="card hoverable"><div class="card-header"><div><h3>${safe(r)}</h3><p>${safe(d)}</p></div><div class="kpi-icon">${icon('shield')}</div></div></div>`).join('')}</div>`});
VIEWS.admin.settings=()=>({title:'System settings',kicker:'Configuration',html:`<div class="settings-stack"><div class="card"><div class="card-header"><div><h3>General</h3><p>Core interface and transport preferences.</p></div></div><div class="form-grid"><div><label>Default language</label><select><option>English</option><option>العربية</option></select></div><div><label>Default landing page</label><select><option>Dashboard</option><option>Operations</option></select></div><div><label>Date format</label><select><option>DD/MM/YYYY</option><option>YYYY-MM-DD</option></select></div><div><label>Reservation cutoff</label><select><option>10 minutes before departure</option><option>15 minutes before departure</option></select></div></div></div><div class="grid grid-2"><div class="card"><div class="card-header"><div><h3>Notifications</h3><p>Choose which operational updates are sent.</p></div></div>${['Trip notifications','Delay alerts','Announcement alerts','Complaint updates'].map(x=>`<div class="toggle-row"><span>${x}</span><label class="switch"><input type="checkbox" checked><span></span></label></div>`).join('')}</div><div class="card"><div class="card-header"><div><h3>Security & accessibility</h3><p>Session and display preferences.</p></div></div>${['Require re-login after inactivity','Reduced motion','Larger text'].map((x,i)=>`<div class="toggle-row"><span>${x}</span><label class="switch"><input type="checkbox" ${i===0?'checked':''}><span></span></label></div>`).join('')}</div></div><button class="primary-btn compact-action" data-action="save-settings">Save settings</button></div>`});
VIEWS.admin.audit=()=>{const events=store.get('audit',[]);const seeded=DATA.recent.slice(0,8).map((t,i)=>({time:new Date(Date.now()-i*46*60*1000).toISOString(),event:'Transport record synchronized',detail:`${t.id} · ${displayUniName(t.uni)}`,user:'System',role:'System'}));const all=[...events,...seeded];return {title:'Activity log',kicker:'Audit',html:`<div class="card"><div class="card-header"><div><h3>Recent activity</h3><p>Account, transport, reservation, support, and staff actions.</p></div></div>${table(['Time','User','Role','Action','Record'],all.map(x=>`<tr><td>${new Date(x.time).toLocaleString(locale())}</td><td>${safe(x.user||'System')}</td><td>${safe(x.role||'System')}</td><td>${safe(x.event)}</td><td>${safe(x.detail)}</td></tr>`))}</div>`};};
VIEWS.admin.notifications=notificationsView;

function profileView(){
  const u=currentUser; const isStudent=u.role==='student', isDriver=u.role==='driver'; const route=isStudent?routeForStudent(u):null; const p=route?routeParts(route):null;
  return {title:'Profile',kicker:'Account details',html:`<div class="grid grid-2"><div class="card"><div class="profile-hero"><div class="profile-avatar">${initials(u.name)}</div><div><h3>${safe(displayName(u))}</h3><p>${safe(tr(ROLES[u.role]))}${u.uni?' · '+safe(displayUniName(u.uni,u)):''}</p></div></div><div class="detail-list"><div class="detail"><span>Account ID</span><strong>${safe(u.login)}</strong></div><div class="detail"><span>Email</span><strong>${safe(u.email||'Not provided')}</strong></div>${isStudent?`<div class="detail"><span>University</span><strong>${safe(displayUniName(u.uni,u))}</strong></div><div class="detail"><span>Faculty / year</span><strong>${safe(facultyName(u))} · ${safe(u.studyYear||'')}</strong></div>${route?`<div class="detail"><span>Assigned route</span><strong>${safe(route.id)}</strong></div><div class="detail"><span>Pickup area</span><strong>${safe(p.origin)}</strong></div>`:`<div class="detail"><span>Route access</span><strong>Route explorer</strong></div>`}`:''}${isDriver?`<div class="detail"><span>Vehicle</span><strong>${safe(u.sub)}</strong></div><div class="detail"><span>Driver rating</span><strong>${safe(u.rating)}</strong></div>`:''}</div></div><div class="card"><div class="card-header"><div><h3>Profile preferences</h3><p>These settings are saved to your UniRide profile.</p></div></div><label>Display name</label><input id="profileName" value="${safe(store.get('profileName_'+u.id,u.name))}"><label>Contact email</label><input id="profileEmail" value="${safe(store.get('profileEmail_'+u.id,u.email||''))}"><div class="toggle-row"><span>Reservation / service reminders</span><label class="switch"><input id="prefReminder" type="checkbox" checked><span></span></label></div><div class="toggle-row"><span>Operational notifications</span><label class="switch"><input id="prefOps" type="checkbox" checked><span></span></label></div><button class="primary-btn" data-action="save-profile" style="margin-top:1rem">${icon('save')} Save profile</button></div></div>`};
}
Object.keys(VIEWS).forEach(role=>VIEWS[role].profile=profileView);


function serviceRuntime(){return store.get('serviceRuntime',{});}
function getServiceStatus(svc){const x=serviceRuntime()[svc.id];return x?.status||svc.status;}
function driverStartTrip(id){const svc=schedules.find(s=>s.id===id);if(!svc)return;const rt=serviceRuntime();rt[id]={...(rt[id]||{}),status:'InProgress',startedAt:new Date().toISOString()};store.set('serviceRuntime',rt);auditEvent('Driver started trip',id);reservedUsers(id).forEach(uid=>addNotification(uid,'Trip started',`Your service ${svc.route.id} is now in progress.`,'service'));toast('Trip started','Passengers and transport staff can now see the active trip.');render();}
function driverEndTrip(id){const svc=schedules.find(s=>s.id===id);if(!svc)return;const rt=serviceRuntime();rt[id]={...(rt[id]||{}),status:'Completed',endedAt:new Date().toISOString()};store.set('serviceRuntime',rt);auditEvent('Driver ended trip',id);reservedUsers(id).forEach(uid=>addNotification(uid,'Trip completed',`Your service ${svc.route.id} has been completed.`,'service'));toast('Trip completed');render();}
function openDriverManifest(id){const svc=schedules.find(s=>s.id===id);if(!svc)return;const ids=reservedUsers(id);const names=ids.map(uid=>DATA.users.find(u=>u.id===uid)).filter(Boolean).map(u=>displayName(u)).join('\n• ');modal({title:'Passenger manifest',message:ids.length?`• ${names}\n\n${ids.length}/${svc.capacity} seats reserved`:'No students have reserved this service yet.',iconName:'users',primary:'Close'});}
function openDelayReport(id){const mins=prompt(LANG==='ar'?'عدد دقائق التأخير:':'Delay in minutes:','10');if(mins===null)return;const reason=prompt(LANG==='ar'?'سبب التأخير:':'Reason for delay:','Traffic');if(reason===null)return;const delays=store.get('driverDelays',[]);delays.unshift({serviceId:id,driverId:currentUser.id,minutes:Number(mins)||0,reason,at:new Date().toISOString()});store.set('driverDelays',delays);reservedUsers(id).forEach(uid=>addNotification(uid,'Service delay',`Your service is delayed by ${Number(mins)||0} minutes. ${reason}`,'service'));auditEvent('Driver reported delay',`${id} · ${mins} min`);toast('Delay reported','Students and transport staff were notified.');}
function toggleDriverAvailability(){const state=store.get('driverAvailabilityState',{});state[currentUser.id]=(state[currentUser.id]||'Available')==='Available'?'Unavailable':'Available';store.set('driverAvailabilityState',state);auditEvent('Driver availability changed',state[currentUser.id]);toast('Availability updated',state[currentUser.id]);render();}
function auditEvent(event,detail){const a=store.get('audit',[]);a.unshift({time:new Date().toISOString(),event,detail,user:currentUser?displayName(currentUser):'System',role:currentUser?ROLES[currentUser.role]:'System'});store.set('audit',a);}

function sendComplaint(){const subject=$('#complaintSubject')?.value.trim(),details=$('#complaintDetails')?.value.trim();if(!subject||!details){toast('Complete the form','Add a subject and details first.');return;}const list=store.get('complaints',[]);list.unshift({userId:currentUser.id,category:$('#complaintCategory').value,priority:$('#complaintPriority').value,subject,details,status:'Open',at:new Date().toISOString()});store.set('complaints',list);auditEvent('Student submitted complaint',subject);addNotification(currentUser.id,'Support request received','Transport staff received your request and can track it from their support queue.','info');toast('Request sent','Your support request is now in the transport queue.');render();}
function sendDriverReport(){const details=$('#driverReportDetails')?.value.trim();if(!details){toast('Add report details','Describe the issue before submitting.');return;}const list=store.get('driverReports',[]);list.unshift({driverId:currentUser.id,type:$('#driverReportType').value,severity:$('#driverReportSeverity').value,details,at:new Date().toISOString()});store.set('driverReports',list);auditEvent('Driver reported incident',details);toast('Report sent','Transport staff has been notified.');$('#driverReportDetails').value='';}
function sendAnnouncement(){const title=$('#announcementTitle')?.value.trim(),message=$('#announcementMessage')?.value.trim(),audience=$('#announcementAudience')?.value;if(!title||!message){toast('Complete the announcement','Add a title and message.');return;}const list=store.get('announcements',[]);list.unshift({title,message,audience,at:new Date().toISOString()});store.set('announcements',list);auditEvent('Staff sent announcement',title);const targets=audience==='All students'?students:audience==='All drivers'?drivers:DATA.users;targets.forEach(u=>addNotification(u.id,title,message,'service'));toast('Announcement sent',`${audience} received the update.`);render();}
function advanceService(id){const svc=schedules.find(s=>s.id===id);if(!svc)return;const order=['Scheduled','Boarding','Departed','Completed'];svc.status=order[Math.min(order.length-1,Math.max(0,order.indexOf(svc.status))+1)];const audit=store.get('audit',[]);audit.unshift({time:new Date().toISOString(),event:'Service status changed',detail:`${id} → ${svc.status}`});store.set('audit',audit);reservedUsers(id).forEach(uid=>addNotification(uid,'Service status updated',`Your reserved service is now ${svc.status}.`,'service'));toast('Service updated',svc.status);render();}
function openStaffTicket(id){let c;if(id.startsWith('ROUTE-')){const i=parseInt(id.replace('ROUTE-',''),10),r=store.get('routeRequests',[])[i];if(r){const route=DATA.routes.find(x=>x.id===r.routeId),student=DATA.users.find(x=>x.id===r.userId);c={subject:'Route assignment request',details:`${student?displayName(student):r.userId}\n${route?routeName(route):r.routeId}`,category:'Route assignment',status:r.status||'Pending'};}}else if(id.startsWith('LOCAL-')){const i=parseInt(id.replace('LOCAL-',''),10);c=store.get('complaints',[])[i];}else{const t=(DATA.tickets||[]).find(x=>x.id===id);if(t)c={subject:t.sub||t.subjectAr||'Support request',details:t.descriptionAr||t.desc||'',category:t.cat||t.categoryAr||'Support',status:t.s||t.status||'Open'};}if(!c)return;modal({title:c.subject||'Support request',message:`${c.category||''} · ${c.status||'Open'}\n\n${c.details||''}`,iconName:'message-square',primary:'Close'});}
function resolveTicket(id){if(id.startsWith('ROUTE-')){const i=parseInt(id.replace('ROUTE-',''),10),list=store.get('routeRequests',[]);if(list[i]){list[i].status='Resolved';store.set('routeRequests',list);addNotification(list[i].userId,'Route request reviewed','Transportation Staff reviewed your route assignment request.','info');auditEvent('Staff reviewed route request',list[i].routeId);}toast('Request resolved');render();return;}const resolved=store.get('resolvedTickets',{});resolved[id]=true;store.set('resolvedTickets',resolved);const localIndex=parseInt(id.replace('LOCAL-',''),10);if(id.startsWith('LOCAL-')){const list=store.get('complaints',[]);if(list[localIndex]){list[localIndex].status='Resolved';store.set('complaints',list);auditEvent('Student submitted complaint',subject);addNotification(list[localIndex].userId,'Support request resolved',`Your request “${list[localIndex].subject}” was marked resolved.`,'info');}}toast('Request resolved');render();}
function toggleAccount(id){const st=store.get('accountStates',{});st[id]=(st[id]||'Active')==='Active'?'Suspended':'Active';store.set('accountStates',st);toast('Account status updated',st[id]);render();}
function saveProfile(){const name=$('#profileName')?.value.trim(),email=$('#profileEmail')?.value.trim();if(name){store.set('profileName_'+currentUser.id,name);currentUser.name=name;}if(email){store.set('profileEmail_'+currentUser.id,email);currentUser.email=email;}$('#topName').textContent=displayName(currentUser);$('#topAvatar').textContent=initials(displayName(currentUser));$('#sidebarUser').innerHTML=`<strong>${safe(displayName(currentUser))}</strong><span>${safe(tr(ROLES[currentUser.role]))}</span>`;toast('Profile saved','Your profile and notification preferences were updated.');render();}

// Wire static controls and restore session.
schedules=buildSchedules();
setupIntro(); setupAuth(); injectIcons(); localizeTree(document);
$('#logoutBtn').onclick=logout;
const saved=store.get('session',null); if(saved){const u=DATA.users.find(x=>x.login===saved);if(u){currentUser={...u,name:store.get('profileName_'+u.id,u.name),email:store.get('profileEmail_'+u.id,u.email||'')};setTimeout(startApp,120);}}

// Delegated nav binding for content rendered after each page.
document.addEventListener('click',e=>{const lang=e.target.closest('[data-lang-toggle]');if(lang){toggleLanguage();return;}const n=e.target.closest('[data-nav]');if(n && !n.closest('#sidebarNav') && n.id!=='profileChip' && n.id!=='notificationBtn' && !n.classList.contains('sidebar-brand')) navigate(n.dataset.nav);});
})();
