📁 blood-donation-app/
├── 📁 public/                     # স্ট্যাটিক ফাইলস (লোগো, ইমেজ ইত্যাদি)
├── 📁 src/
│   ├── 📁 app/                    # Next.js App Router (সব রুট এখানে থাকবে)
│   │   ├── 📄 layout.js           # গ্লোবাল লেআউট (Navbar & Footer এখানেই থাকবে)
│   │   ├── 📄 page.js             # ৫. হোম পেজ (/)
│   │   │
│   │   ├── 📁 login/              # ৩.২ লগইন পেজ (/login)
│   │   │   └── 📄 page.js
│   │   │
│   │   ├── 📁 register/           # ৩.১ রেজিস্ট্রেশন পেজ (/register)
│   │   │   └── 📄 page.js
│   │   │
│   │   ├── 📁 search/             # ৯. সার্চ পেজ (/search)
│   │   │   └── 📄 page.js
│   │   │
│   │   ├── 📁 donation-requests/  # ৬. ব্লাড ডোনেশন রিকোয়েস্টস পেজ (/donation-requests)
│   │   │   ├── 📄 page.js
│   │   │   └── 📁 [id]/           # ৭. রিকোয়েস্ট ডিটেইলস পেজ (/donation-requests/:id - প্রাইভেট)
│   │   │       └── 📄 page.js
│   │   │
│   │   ├── 📁 funding/            # ৮. ফান্ডিং পেজ (/funding - প্রাইভেট)
│   │   │   └── 📄 page.js
│   │   │
│   │   └── 📁 dashboard/          # ৪. ড্যাশবোর্ড লেআউট ও রুটস (sidebar যুক্ত)
│   │       ├── 📄 layout.js       # ড্যাশবোর্ডের জন্য এক্সক্লুসিভ সাইডবার লেআউট
│   │       ├── 📄 page.js         # ৪.১, ৪.২, ৪.৩ ড্যাশবোর্ড হোম (/dashboard - রোল অনুযায়ী কন্টেন্ট পরিবর্তন হবে)
│   │       │
│   │       ├── 📁 profile/        # প্রোফাইল পেজ (/dashboard/profile)
│   │       │   └── 📄 page.js
│   │       │
│   │       ├── 📁 my-donation-requests/ # ডোনর: নিজের রিকোয়েস্ট (/dashboard/my-donation-requests)
│   │       │   └── 📄 page.js
│   │       │
│   │       ├── 📁 create-donation-request/ # ডোনর: নতুন রিকোয়েস্ট তৈরি (/dashboard/create-donation-request)
│   │       │   └── 📄 page.js
│   │       │
│   │       ├── 📁 all-users/      # অ্যাডমিন: ইউজার ম্যানেজমেন্ট (/dashboard/all-users)
│   │       │   └── 📄 page.js
│   │       │
│   │       └── 📁 all-blood-donation-request/ # অ্যাডমিন ও ভলান্টিয়ার: সব রিকোয়েস্ট ম্যানেজমেন্ট
│   │           └── 📄 page.js     # (/dashboard/all-blood-donation-request)
│   │
│   ├── 📁 components/             # রিইউজেবল UI কম্পোনেন্টস
│   │   ├── 📁 common/             # গ্লোবাল কম্পোনেন্টস
│   │   │   ├── 📄 Navbar.jsx
│   │   │   ├── 📄 Footer.jsx
│   │   │   └── 📄 Loading.jsx
│   │   ├── 📁 dashboard/          # ড্যাশবোর্ডের স্পেসিফিক কম্পোনেন্টস
│   │   │   ├── 📄 Sidebar.jsx
│   │   │   ├── 📄 StatCard.jsx
│   │   │   └── 📄 DonationTable.jsx
│   │   └── 📁 ui/                 # ছোট UI এলিমেন্টস (Buttons, Modals, Inputs)
│   │       ├── 📄 Button.jsx
│   │       ├── 📄 Modal.jsx
│   │       └── 📄 CustomSelect.jsx
│   │
│   ├── 📁 hooks/                  # কাস্টম রিয়্যাক্ট হুকস (যেমন- useAuth, useAxiosSecure)
│   │   ├── 📄 useAuth.js
│   │   ├── 📄 useAxiosSecure.js
│   │   └── 📄 useRole.js          # ইউজারের রোল (Admin, Donor, Volunteer) গেট করার জন্য
│   │
│   ├── 📁 providers/              # কনটেক্সট প্রোভাইডারস
│   │   └── 📄 AuthProvider.jsx    # Firebase/Custom Auth + JWT হ্যান্ডেল করার জন্য
│   │
│   └── 📁 utils/                  # হেল্পার ফাংশন ও ডাটা রিসোর্স
│       ├── 📄 bangladesh-geocode.json # ডিস্ট্রিক্ট ও উপজেলা ডাটা রিসোর্স
│       └── 📄 formatDate.js
│
├── 📄 .env.local                  # ফ্রন্টএন্ড এনভায়রনমেন্ট ভেরিয়েবলস (Stripe, ImgBB keys)
├── 📄 middleware.js               # ১০. JWT ও রুট প্রোটেকশন (Private & Role-based routes)
├── 📄 next.config.js
└── 📄 package.json

#####
📁 src/
└── 📁 components/
    └── 📁 home/                  # হোম পেজের নির্দিষ্ট কম্পোনেন্টসমূহ
        ├── 📄 BannerSlider.jsx   # 🎬 এইখানে আপনার স্লাইডার বা ক্যারোজেল থাকবে
        ├── 📄 FeaturedSection.jsx
        └── 📄 ContactUs.jsx




#####
<!-- // src/app/dashboard/page.js
import DonorHome from "@/components/dashboard/DonorHome";
import AdminHome from "@/components/dashboard/AdminHome";
import VolunteerHome from "@/components/dashboard/VolunteerHome";

export default function DashboardHome() {
  const { role } = useRole(); // কাস্টম হুক টু গেট রোল

  if (role === 'admin') return <AdminHome />;
  if (role === 'volunteer') return <VolunteerHome />;
  return <DonorHome />;
} -->

