import { useNavigate, useParams } from "react-router"
import { useEffect, useRef } from "react"
import { createData, updateData, getDataById } from "../store/redux/contactReducer"
import { useSelector, useDispatch } from "react-redux"

const Entry = ({ isUpdate }) => {
  const { id } = useParams()
  const formRef = useRef(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { contactDetail, isLoading, isError } = useSelector(
    (state) => state.contact
  )

  useEffect(() => {
    if (isUpdate && id) {
      dispatch(getDataById(id))
    }
  }, [id, isUpdate, dispatch])

  useEffect(() => {
    if (isUpdate) {
      if (!contactDetail || !formRef.current) return

      formRef.current.fullname.value = contactDetail.fullname || ""
      formRef.current.email.value = contactDetail.email || ""
      formRef.current.phone.value = contactDetail.phone || ""
      formRef.current.company.value = contactDetail.company || ""
      formRef.current.job_title.value = contactDetail.job_title || ""
      formRef.current.notes.value = contactDetail.notes || ""
    } else {
      if (formRef.current) formRef.current.reset()
    }
  }, [contactDetail, isUpdate])

  return (
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
                    </div>
                  </div>
                </div>

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
                      />
                    </div>
                  </div>
                </div>


                {/* Actions */}
                <div className="flex gap-4 pt-6 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => navigate("/home")}
                    className="px-6 py-3 rounded-xl border border-slate-200 text-slate-600 font-medium
                            hover:bg-slate-50 hover:text-slate-800 transition-colors"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold
                            shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all duration-200"
                  >
                    {isUpdate ? "Save Changes" : "Create Contact"}
                  </button>
                </div>

              </form>
            )}

          </div>

        </div>

      </div>
    </div>
  )
}

export default Entry
