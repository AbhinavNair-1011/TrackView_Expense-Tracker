import React from 'react'

const ProfileInfoView = ({userProfileData}) => {
  return (


                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</p>
                            <p className="text-lg font-medium text-gray-800">
                                {userProfileData?.full_name || <span className="text-gray-400">Not provided</span>}
                            </p>
                        </div>

                        <div className="space-y-1">
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Email Address</p>
                            <p className="text-lg font-medium text-gray-800">
                                {userProfileData?.email || <span className="text-gray-400">Not provided</span>}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</p>
                            <p className="text-lg font-medium text-gray-800">
                                {userProfileData?.phone || <span className="text-gray-400">Not provided</span>}
                            </p>
                        </div>

                        <div className="space-y-1">
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Date of Birth</p>
                            <p className="text-lg font-medium text-gray-800">
                                {userProfileData?.dob ?
                                    new Date(userProfileData.dob).toLocaleDateString() :
                                    <span className="text-gray-400">Not provided</span>}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</p>
                            <p className="text-lg font-medium text-gray-800">
                                {userProfileData?.gender ?
                                    userProfileData.gender.charAt(0).toUpperCase() + userProfileData.gender.slice(1) :
                                    <span className="text-gray-400">Not provided</span>}
                            </p>
                        </div>

                        <div className="space-y-1">
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Address</p>
                            <p className="text-lg font-medium text-gray-800">
                                {userProfileData?.address || <span className="text-gray-400">Not provided</span>}
                            </p>
                        </div>
                    </div>
                </div>
            )
}

export default ProfileInfoView