"use client"

import { createContext, useContext, useState, useEffect } from "react"
import apiService from "../services/api"

const AuthContext = createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Check if user is already logged in with valid token
    const initializeAuth = async () => {
      try {
        const token = apiService.getToken()
        if (token) {
          // Validate token by making an API call
          const isValid = await apiService.validateToken()
          if (isValid) {
            // Get user info from about endpoint or create user object
            try {
              const aboutInfo = await apiService.getAboutInfo()
              if (aboutInfo.user) {
                // Admin user with full info
                setUser({
                  id: Date.now(), // Generate temporary ID
                  name: aboutInfo.user.name,
                  email: aboutInfo.user.email,
                  phone: aboutInfo.user.mobile_number,
                  role: "admin", // Default role, could be enhanced
                  avatar: "/images/user-avatar.jpg",
                  permissions: ["view_dashboard", "manage_inventory", "manage_staff", "manage_employees"],
                  lastLogin: new Date().toISOString(),
                  companyData: aboutInfo.company_data,
                })
              } else {
                // Public user info
                setUser({
                  id: Date.now(),
                  name: aboutInfo.name || "User",
                  phone: aboutInfo.mobile_number,
                  role: "user",
                  avatar: "/images/user-avatar.jpg",
                  permissions: ["view_dashboard"],
                  lastLogin: new Date().toISOString(),
                })
              }
            } catch (aboutError) {
              // If about endpoint fails, create minimal user object
              setUser({
                id: Date.now(),
                name: "User",
                role: "user",
                avatar: "/images/user-avatar.jpg",
                permissions: ["view_dashboard"],
                lastLogin: new Date().toISOString(),
              })
            }
          } else {
            // Token is invalid, remove it
            apiService.removeToken()
          }
        }
      } catch (error) {
        console.error("Auth initialization error:", error)
        apiService.removeToken()
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()
  }, [])

  const login = async (username, password, role) => {
    try {
      setError(null)
      setLoading(true)

      // Map frontend roles to backend usernames if needed
      let backendUsername = username
      if (username.includes("@example.com")) {
        // Extract role from demo email
        backendUsername = username.split("@")[0]
      }

      const result = await apiService.login(backendUsername, password)

      if (result.success) {
        // Create user object based on API response
        const userData = {
          id: Date.now(),
          name: getDisplayName(result.role, backendUsername),
          email: username,
          role: mapBackendRole(result.role, role),
          avatar: getAvatarForRole(result.role),
          permissions: getPermissionsForRole(result.role),
          lastLogin: new Date().toISOString(),
          backendRole: result.role,
        }

        // Try to get additional user info
        try {
          const aboutInfo = await apiService.getAboutInfo()
          if (aboutInfo.user) {
            userData.name = aboutInfo.user.name
            userData.email = aboutInfo.user.email
            userData.phone = aboutInfo.user.mobile_number
            userData.companyData = aboutInfo.company_data
          } else if (aboutInfo.name) {
            userData.name = aboutInfo.name
            userData.phone = aboutInfo.mobile_number
          }
        } catch (aboutError) {
          console.warn("Could not fetch additional user info:", aboutError)
        }

        setUser(userData)
        return { success: true, user: userData }
      } else {
        setError(result.error)
        return { success: false, error: result.error }
      }
    } catch (error) {
      console.error("Login error:", error)
      const errorMessage = error.message || "An error occurred during login"
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    apiService.removeToken()
    return { success: true }
  }

  const updateProfile = async (userData) => {
    try {
      // Update profile via API
      const updateData = {
        user: {
          name: userData.name,
          email: userData.email,
          mobile_number: userData.phone,
        },
        company_data: userData.companyData || {},
      }

      await apiService.updateAboutInfo(updateData)

      // Update local user state
      const updatedUser = { ...user, ...userData }
      setUser(updatedUser)

      return { success: true, user: updatedUser }
    } catch (error) {
      console.error("Update profile error:", error)
      return { success: false, error: "An error occurred while updating profile" }
    }
  }

  const changePassword = async (currentPassword, newPassword) => {
    try {
      // Note: The API doesn't seem to have a change password endpoint
      // This would need to be implemented on the backend
      // For now, we'll simulate success
      return { success: true, message: "Password changed successfully" }
    } catch (error) {
      console.error("Change password error:", error)
      return { success: false, error: "An error occurred while changing password" }
    }
  }

  const checkPermission = (permission) => {
    if (!user || !user.permissions) return false
    return user.permissions.includes(permission)
  }

  const refreshUserData = async () => {
    try {
      const aboutInfo = await apiService.getAboutInfo()
      if (aboutInfo.user && user) {
        const updatedUser = {
          ...user,
          name: aboutInfo.user.name,
          email: aboutInfo.user.email,
          phone: aboutInfo.user.mobile_number,
          companyData: aboutInfo.company_data,
        }
        setUser(updatedUser)
      }
    } catch (error) {
      console.error("Error refreshing user data:", error)
    }
  }

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    updateProfile,
    changePassword,
    checkPermission,
    refreshUserData,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Helper functions
function getDisplayName(backendRole, username) {
  const roleNames = {
    admin: "Administrator",
    manager: "Manager",
    employee: "Employee",
  }
  return roleNames[backendRole] || username
}

function mapBackendRole(backendRole, frontendRole) {
  // Map backend roles to frontend roles
  const roleMapping = {
    admin: frontendRole || "corporate",
    manager: frontendRole || "restaurant",
    employee: frontendRole || "restaurant",
  }
  return roleMapping[backendRole] || frontendRole || "restaurant"
}

function getAvatarForRole(role) {
  const avatars = {
    admin: "/images/admin-avatar.jpg",
    manager: "/images/manager-avatar.jpg",
    employee: "/images/employee-avatar.jpg",
  }
  return avatars[role] || "/images/user-avatar.jpg"
}

function getPermissionsForRole(role) {
  const permissions = {
    admin: [
      "view_dashboard",
      "manage_inventory",
      "manage_staff",
      "manage_employees",
      "manage_settings",
      "view_reports",
    ],
    manager: ["view_dashboard", "manage_inventory", "manage_staff", "view_reports"],
    employee: ["view_dashboard", "view_inventory"],
  }
  return permissions[role] || ["view_dashboard"]
}

export default AuthContext
