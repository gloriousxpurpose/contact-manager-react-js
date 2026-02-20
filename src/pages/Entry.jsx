import { useNavigate, useParams } from "react-router";
import { useEffect, useRef } from "react";
import useContactStore from "../store/contactStore";

const Entry = ({ isUpdate }) => {
  const { id } = useParams();
  const formRef = useRef(null);
  const navigate = useNavigate();

  const {
    contactDetail,
    fetchContactById,
    createContact,
    updateContact,
    clearContactDetail,
    clearError,
    isLoading,
    isError,
    error,
  } = useContactStore();

  useEffect(() => {
    if (isUpdate && id) fetchContactById(id);
    return () => { clearContactDetail(); clearError(); };
  }, [id, isUpdate]);

  useEffect(() => {
    if (isUpdate && contactDetail && formRef.current) {
      formRef.current.fullname.value = contactDetail.fullname || "";
      formRef.current.email.value = contactDetail.email || "";
      formRef.current.phone.value = contactDetail.phone || "";
      formRef.current.company.value = contactDetail.company || "";
      formRef.current.job_title.value = contactDetail.job_title || "";
      formRef.current.notes.value = contactDetail.notes || "";
    } else if (!isUpdate && formRef.current) {
      formRef.current.reset();
    }
  }, [contactDetail, isUpdate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      fullname: e.target.fullname.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      company: e.target.company.value,
      job_title: e.target.job_title.value,
      notes: e.target.notes.value,
    };
    try {
      if (isUpdate) await updateContact(id, payload);
      else await createContact(payload);
      navigate("/contact");
    } catch (err) {
      // error shown via store
    }
  };

  const gradientBg = "linear-gradient(135deg, #22c55e 0%, #059669 50%, #0f766e 100%)";

  const inputClass = `w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 text-sm
    placeholder:text-gray-400 outline-none transition-all duration-200
    focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10`;

  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-gray-50">
      {/* Top accent */}
      <div className="h-1 w-full" style={{ background: gradientBg }} />

      {/* Navbar */}
      <header className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-16 flex items-center">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-md"
              style={{ background: gradientBg }}>
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <span className="text-lg font-bold text-gray-900">ContactVault</span>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10">

        {/* Back */}
        <button
          onClick={() => navigate("/contact")}
          className="flex items-center gap-2 text-gray-500 hover:text-emerald-600 transition-colors mb-8 text-sm font-medium group"
        >
          <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Contacts
        </button>

        {/* Card */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-lg overflow-hidden">

          {/* Gradient Header */}
          <div className="px-8 py-7" style={{ background: gradientBg }}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(255,255,255,0.20)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.3)" }}>
                {isUpdate ? (
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                )}
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">{isUpdate ? "Update Contact" : "New Contact"}</h2>
                <p className="text-green-100 text-sm mt-0.5">
                  {isUpdate ? "Edit the details for this contact." : "Add a new person to your contact list."}
                </p>
              </div>
            </div>
          </div>

          {/* Form Body */}
          <div className="px-8 py-8">

            {/* Loading */}
            {isLoading && (
              <div className="flex flex-col items-center justify-center py-16 gap-4">
                <div className="w-10 h-10 border-2 border-gray-200 border-t-emerald-500 rounded-full animate-spin" />
                <p className="text-gray-400 text-sm">{isUpdate ? "Loading contact..." : "Saving..."}</p>
              </div>
            )}

            {/* Error */}
            {isError && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 px-5 py-4 rounded-xl mb-6 flex justify-between items-center text-sm">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-rose-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  {error || "Something went wrong."}
                </div>
                <button onClick={clearError} className="text-rose-400 hover:text-rose-600 text-xl font-bold ml-4 leading-none">×</button>
              </div>
            )}

            {!isLoading && (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-7">

                {/* Section: Basic Info */}
                <div>
                  <div className="flex items-center gap-2.5 mb-5">
                    <div className="w-1 h-5 rounded-full" style={{ background: gradientBg }} />
                    <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Basic Information</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Full Name <span className="text-green-500">*</span>
                      </label>
                      <input name="fullname" type="text" required placeholder="e.g. John Doe" className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Email <span className="text-green-500">*</span>
                      </label>
                      <input name="email" type="email" required placeholder="e.g. john@example.com" className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Phone <span className="text-green-500">*</span>
                      </label>
                      <input name="phone" type="text" required placeholder="e.g. 08123456789" className={inputClass} />
=======
    <div className="min-h-screen bg-slate-50 p-6">

      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => navigate('/home')}
            className="flex items-center text-slate-500 hover:text-indigo-600 transition-colors"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Back to Contacts
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">

          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white">
            <h2 className="text-3xl font-bold">
              {isUpdate ? "Update Contact" : "New Contact"}
            </h2>
            <p className="text-indigo-100 mt-2">
              {isUpdate
                ? "Update the details for this contact."
                : "Add a new person to your contact list."}
            </p>
          </div>

          <div className="p-8">
            {isLoading && (
              <div className="flex justify-center py-12">
                <svg className="animate-spin h-10 w-10 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            )}

            {isError && (
              <div className="bg-rose-50 text-rose-700 p-4 rounded-xl border border-rose-100 mb-6">
                Failed to load contact data. Please try again.
              </div>
            )}

            {!isLoading && !isError && (
              <form
                ref={formRef}
                onSubmit={(e) => {
                  e.preventDefault()

                  const payload = {
                    fullname: e.target.fullname.value,
                    email: e.target.email.value,
                    phone: e.target.phone.value,
                    company: e.target.company.value,
                    job_title: e.target.job_title.value,
                    notes: e.target.notes.value
                  }

                  if (isUpdate) {
                    dispatch(updateData({ id, payload }))
                  } else {
                    dispatch(createData(payload))
                  }

                  navigate("/home")
                }}
                className="space-y-8"
              >

                {/* Basic Info Section */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                    </span>
                    Basic Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="col-span-1 md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-1.5 ml-1">Full Name</label>
                      <input
                        name="fullname"
                        type="text"
                        required
                        className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-4 py-3 
                                    outline-none transition-all duration-200
                                    focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                        placeholder="e.g. John Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5 ml-1">Email Address</label>
                      <input
                        name="email"
                        type="email"
                        className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-4 py-3 
                                    outline-none transition-all duration-200
                                    focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                        placeholder="e.g. john@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5 ml-1">Phone Number</label>
                      <input
                        name="phone"
                        type="text"
                        className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-4 py-3 
                                    outline-none transition-all duration-200
                                    focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                        placeholder="e.g. 08123456789"
                      />
>>>>>>> f272239fe7737c8a9e57d97ac5721cd6acd1366f
                    </div>
                  </div>
                </div>

<<<<<<< HEAD
                <div className="h-px bg-gray-100" />

                {/* Section: Work & Notes */}
                <div>
                  <div className="flex items-center gap-2.5 mb-5">
                    <div className="w-1 h-5 rounded-full" style={{ background: "linear-gradient(to bottom, #059669, #0f766e)" }} />
                    <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Work &amp; Notes</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Company</label>
                      <input name="company" type="text" placeholder="e.g. Tech Corp" className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Job Title</label>
                      <input name="job_title" type="text" placeholder="e.g. Software Engineer" className={inputClass} />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Notes</label>
                      <textarea
                        name="notes"
                        rows={4}
                        placeholder="Additional notes about this contact..."
                        className={`${inputClass} resize-none`}
=======
                <div className="h-px bg-slate-100"></div>

                {/* Work Info Section */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                    </span>
                    Work & Notes
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5 ml-1">Company</label>
                      <input
                        name="company"
                        type="text"
                        className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-4 py-3 
                                    outline-none transition-all duration-200
                                    focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                        placeholder="e.g. Tech Corp"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5 ml-1">Job Title</label>
                      <input
                        name="job_title"
                        type="text"
                        className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-4 py-3 
                                    outline-none transition-all duration-200
                                    focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                        placeholder="e.g. Software Engineer"
                      />
                    </div>

                    <div className="col-span-1 md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-1.5 ml-1">Notes</label>
                      <textarea
                        name="notes"
                        rows="4"
                        className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-4 py-3 
                                    outline-none transition-all duration-200 resize-none
                                    focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                        placeholder="Additional notes about this contact..."
>>>>>>> f272239fe7737c8a9e57d97ac5721cd6acd1366f
                      />
                    </div>
                  </div>
                </div>

<<<<<<< HEAD
                {/* Actions */}
                <div className="flex gap-3 pt-2 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => navigate("/contact")}
                    className="px-6 py-3 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold
                      hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800 transition-all"
=======

                {/* Actions */}
                <div className="flex gap-4 pt-6 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => navigate("/home")}
                    className="px-6 py-3 rounded-xl border border-slate-200 text-slate-600 font-medium
                            hover:bg-slate-50 hover:text-slate-800 transition-colors"
>>>>>>> f272239fe7737c8a9e57d97ac5721cd6acd1366f
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
<<<<<<< HEAD
                    disabled={isLoading}
                    className="flex-1 px-6 py-3 rounded-xl text-white text-sm font-semibold
                      shadow-md hover:-translate-y-0.5 transition-all duration-200
                      disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:translate-y-0"
                    style={{ background: gradientBg, boxShadow: "0 6px 20px rgba(5,150,105,0.30)" }}
                  >
                    {isLoading ? "Saving..." : isUpdate ? "Save Changes" : "Create Contact"}
=======
                    className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold
                            shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all duration-200"
                  >
                    {isUpdate ? "Save Changes" : "Create Contact"}
>>>>>>> f272239fe7737c8a9e57d97ac5721cd6acd1366f
                  </button>
                </div>

              </form>
            )}
<<<<<<< HEAD
          </div>
        </div>
      </main>
=======

          </div>

        </div>

      </div>
>>>>>>> f272239fe7737c8a9e57d97ac5721cd6acd1366f
    </div>
  );
};

export default Entry;