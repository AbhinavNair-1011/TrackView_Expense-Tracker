import React from 'react'

const SecurityView = ({userProfileData}) => {
  return (
    

                <div className="space-y-6">
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                        <div>
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Password</p>
                            <p className="text-gray-800 font-medium">••••••••••</p>
                        </div>
                      
                    </div>

                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                        <div>
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                                Two-Factor Authentication
                            </p>
                            <div className="flex items-center gap-2">
                              
                                {userProfileData?.two_fa_enabled ? (
                                    <span className="px-2 py-1 mt-2 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                                        Active
                                    </span>
                                ) 
                            :
                               <span className="px-2 py-1 mt-2 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                                        Inactive
                                    </span>
                                    }
                            </div>
                        </div>
                     
                    </div>
                </div>
          
  )
}

export default SecurityView