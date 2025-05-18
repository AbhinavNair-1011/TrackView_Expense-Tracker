import React from 'react'

const SecurityView = ({userProfileData,onSecurityManage}) => {
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
                                <p className={`font-medium ${userProfileData?.two_fa_enabled ? 'text-green-600' : 'text-gray-600'}`}>
                                    {userProfileData?.two_fa_enabled ? 'Enabled' : 'Disabled'}
                                </p>
                                {userProfileData?.two_fa_enabled && (
                                    <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                                        Active
                                    </span>
                                )}
                            </div>
                        </div>
                     
                    </div>
                </div>
          
  )
}

export default SecurityView