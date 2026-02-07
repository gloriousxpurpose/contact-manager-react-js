import { useNavigate } from "react-router"
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData, deleteData } from "../store/redux/contactReducer";

const Home = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch();

  const { value: contact, isError, isLoading } = useSelector(
    (state) => state.contact
  );

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("asc"); // asc | desc

  useEffect(() => {
    dispatch(getData())
  }, [dispatch])

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const filteredContacts = useMemo(() => {
    if (!contact) return [];

    let result = contact.filter((item) => {
      const keyword = search.toLowerCase();

      return (
        item.fullname?.toLowerCase().includes(keyword) ||
        item.email?.toLowerCase().includes(keyword) ||
        item.phone?.toLowerCase().includes(keyword)
      );
    });

    result.sort((a, b) => {
      const nameA = a.fullname?.toLowerCase() || "";
      const nameB = b.fullname?.toLowerCase() || "";

      if (sort === "asc") return nameA.localeCompare(nameB);
      return nameB.localeCompare(nameA);
    });

    return result;
  }, [contact, search, sort]);

  // Helper to generate a consistent gradient based on name char for variety
  const getGradient = (name) => {
    const gradients = [
      "from-blue-500 to-cyan-400",
      "from-purple-500 to-pink-500",
      "from-emerald-400 to-teal-500",
      "from-orange-400 to-amber-400",
      "from-indigo-500 to-blue-500",
      "from-rose-500 to-red-500",
    ];
    if (!name) return gradients[0];
    const index = name.charCodeAt(0) % gradients.length;
    return gradients[index];
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-700">

      {/* Navbar / Header */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3 group cursor-pointer" onClick={() => navigate('/home')}>
              <div className="relative">
                <div className="absolute inset-0 bg-indigo-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-500/20">
                  C
                </div>
              </div>
              <div>
                <span className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Contact<span className="text-indigo-600">Manager</span></span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("entry")}
                className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 text-white font-medium hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-500/20 active:scale-95 transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                <span>New Contact</span>
              </button>
              <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>
              <button
                onClick={handleLogout}
                className="p-2.5 rounded-full text-slate-500 hover:bg-rose-50 hover:text-rose-600 transition-all duration-300 group"
                title="Logout"
              >
                <svg className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Mobile FAB */}
        <div className="sm:hidden fixed bottom-6 right-6 z-40">
          <button
            onClick={() => navigate("entry")}
            className="w-14 h-14 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-xl shadow-indigo-600/30 hover:scale-110 active:scale-90 transition-all duration-300"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
          </button>
        </div>

        {/* Filters & Search Toolbar */}
        <div className="bg-white rounded-2xl p-2 shadow-sm border border-slate-100 mb-10 flex flex-col md:flex-row gap-2">
          <div className="relative flex-1 group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search your contacts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="block w-full pl-11 pr-4 py-3 bg-transparent border-none rounded-xl text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-indigo-100 focus:bg-slate-50 transition-all font-medium"
            />
          </div>

          <div className="h-px md:h-auto md:w-px bg-slate-100 mx-2"></div>

          <div className="w-full md:w-56 relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"></path></svg>
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="block w-full pl-10 pr-10 py-3 bg-transparent border-none rounded-xl text-slate-600 font-medium focus:ring-2 focus:ring-indigo-100 focus:bg-slate-50 cursor-pointer transition-all appearance-none"
            >
              <option value="asc">Name (A-Z)</option>
              <option value="desc">Name (Z-A)</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>

        {/* Content Area */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-32 opacity-70">
            <div className="relative w-16 h-16 mb-4">
              <div className="absolute inset-0 rounded-full border-4 border-indigo-100"></div>
              <div className="absolute inset-0 rounded-full border-4 border-t-indigo-600 animate-spin"></div>
            </div>
            <p className="text-slate-500 font-medium animate-pulse">Syncing contacts...</p>
          </div>
        )}

        {isError && (
          <div className="max-w-md mx-auto text-center py-20 bg-white rounded-3xl shadow-lg border border-rose-100 p-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-rose-50 text-rose-500 mb-6 animate-bounce">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Connection Issue</h3>
            <p className="text-slate-500 mb-6">We couldn't retrieve your contacts. Please check your internet connection.</p>
            <button
              onClick={() => dispatch(getData())}
              className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300"
            >
              Try Again
            </button>
          </div>
        )}

        {!isLoading && !isError && (
          <>
            {filteredContacts.length === 0 ? (
              <div className="text-center py-24 px-4">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-slate-100 text-slate-300 mb-6 relative">
                  <div className="absolute top-0 right-0 w-8 h-8 bg-indigo-500 rounded-full border-4 border-white flex items-center justify-center text-white">
                    <span className="text-xl font-bold">+</span>
                  </div>
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">No contacts found</h3>
                <p className="text-slate-500 mb-8 max-w-sm mx-auto">
                  {search ? `We couldn't find anyone matching "${search}"` : "Your contact list is empty. Start building your network!"}
                </p>
                {!search && (
                  <button
                    onClick={() => navigate("entry")}
                    className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-indigo-600 text-white font-bold hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-1 transition-all duration-300"
                  >
                    Create First Contact
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredContacts.map((item) => {
                  const gradient = getGradient(item.fullname);

                  return (
                    <div
                      key={item.contact_id}
                      className="group relative bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-2xl hover:shadow-indigo-100/50 hover:border-indigo-100 transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col justify-between h-full"
                    >
                      {/* Color Bar Top */}
                      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${gradient}`}></div>

                      <div className="p-6">
                        <div className="flex items-start justify-between mb-5">
                          <div className="flex items-center gap-4">
                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} p-0.5 shadow-md group-hover:scale-105 transition-transform duration-300`}>
                              <div className="w-full h-full bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-white font-bold text-2xl uppercase border border-white/20">
                                {item.fullname?.charAt(0)}
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
                            <button
                              onClick={() => navigate(`update/${item.contact_id}`)}
                              className="p-2 rounded-lg text-slate-400 hover:bg-slate-50 hover:text-indigo-600 transition-colors"
                              title="Edit"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                            </button>
                            <button
                              onClick={() => dispatch(deleteData(item.contact_id))}
                              className="p-2 rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                              title="Delete"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                            </button>
                          </div>
                        </div>

                        <div className="mb-4">
                          <h3 className="text-lg font-bold text-slate-800 line-clamp-1 group-hover:text-indigo-600 transition-colors" title={item.fullname}>
                            {item.fullname}
                          </h3>
                          <p className="text-sm font-medium text-slate-400 line-clamp-1">{item.job_title || "No Job Title"}</p>
                        </div>

                        <div className="space-y-3">
                          {/* Email */}
                          <div className="flex items-center gap-3 p-2 rounded-lg bg-slate-50 border border-slate-100 group-hover:border-indigo-50 group-hover:bg-indigo-50/30 transition-colors">
                            <div className="w-8 h-8 rounded-full bg-white text-indigo-500 flex items-center justify-center shrink-0 shadow-sm">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">Email</p>
                              <p className="text-sm text-slate-700 font-medium truncate" title={item.email}>{item.email}</p>
                            </div>
                          </div>

                          {/* Phone */}
                          <div className="flex items-center gap-3 p-2 rounded-lg bg-slate-50 border border-slate-100 group-hover:border-indigo-50 group-hover:bg-indigo-50/30 transition-colors">
                            <div className="w-8 h-8 rounded-full bg-white text-emerald-500 flex items-center justify-center shrink-0 shadow-sm">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">Phone</p>
                              <p className="text-sm text-slate-700 font-medium truncate">{item.phone}</p>
                            </div>
                          </div>

                          {/* Company if exists */}
                          {item.company && (
                            <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-50">
                              <span className="px-2 py-1 rounded-md bg-slate-100 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                                Company
                              </span>
                              <span className="text-sm text-slate-700 font-medium truncate">
                                {item.company}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Hover Actions Overlay (Desktop) */}
                      {/* Can be sophisticated, but kept simple with the top-right buttons for now to ensure usability on touch */}
                    </div>
                  )
                })}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}

export default Home
