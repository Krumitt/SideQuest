import React from 'react';

export default function Policy() {
    return (
        <div className="w-full bg-white dark:bg-black min-h-[60vh]">
            <div className="max-w-4xl mx-auto px-6 py-16">
                <header className="mb-12 border-b border-gray-200 dark:border-gray-800 pb-6">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-wide">
                        Privacy Policy
                    </h1>
                </header>

                <section className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
                    <p className="mb-6">
                        At SideQuest, we respect your privacy and are committed to protecting it through our compliance with this policy. This policy details how we collect, use, and protect your personal information.
                    </p>

                    <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-900 dark:text-white">1. Information We Collect</h2>
                    <p className="mb-6">
                        We may retrieve several types of information from and about users of our Website, including information by which you may be personally identified, such as name, postal address, e-mail address, and telephone number. We collect this data when you register an account, make a purchase, or subscribe to our newsletters.
                    </p>

                    <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-900 dark:text-white">2. How We Use Your Information</h2>
                    <p className="mb-4">We use information that we collect about you or that you provide to us, including any personal information:</p>
                    <ul className="list-disc pl-6 mb-6">
                        <li>To present our Website and its contents to you.</li>
                        <li>To process transactions and fulfill your orders.</li>
                        <li>To notify you about changes to our Website or any products or services we offer.</li>
                        <li>To fulfill any other purpose for which you provide it.</li>
                    </ul>

                    <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-900 dark:text-white">3. Data Security</h2>
                    <p className="mb-6">
                        We have implemented measures designed to secure your personal information from accidental loss and from unauthorized access, use, alteration, and disclosure. All payment transactions are encrypted using strict industry standards.
                    </p>
                </section>
            </div>
        </div>
    );
}
