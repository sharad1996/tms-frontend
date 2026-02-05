import { useState, useEffect } from 'react';

/**
 * Hook to check user permissions based on their role
 * Usage: const { can, permissions } = usePermissions(user);
 */
export function usePermissions(user) {
  const [permissions, setPermissions] = useState(null);

  useEffect(() => {
    if (user) {
      setPermissions(user.permissions);
    } else {
      setPermissions(null);
    }
  }, [user]);

  /**
   * Check if user has a specific permission
   * @param {string} permissionKey - The permission to check (e.g., 'addShipment')
   * @returns {boolean} True if user has permission, false otherwise
   */
  const can = (permissionKey) => {
    if (!user || !permissions) return false;
    return permissions[permissionKey] === true;
  };

  /**
   * Check if user has ALL of multiple permissions
   * @param {string[]} permissionKeys - Array of permissions to check
   * @returns {boolean} True if user has ALL permissions
   */
  const canAll = (permissionKeys) => {
    if (!user || !permissions) return false;
    return permissionKeys.every((key) => permissions[key] === true);
  };

  /**
   * Check if user has ANY of multiple permissions
   * @param {string[]} permissionKeys - Array of permissions to check
   * @returns {boolean} True if user has ANY permission
   */
  const canAny = (permissionKeys) => {
    if (!user || !permissions) return false;
    return permissionKeys.some((key) => permissions[key] === true);
  };

  /**
   * Check user role
   * @param {string} role - The role to check (ADMIN or EMPLOYEE)
   * @returns {boolean} True if user has the role
   */
  const isRole = (role) => {
    return user && user.role === role;
  };

  /**
   * Check if user is admin
   * @returns {boolean} True if user is admin
   */
  const isAdmin = () => {
    return isRole('ADMIN');
  };

  /**
   * Check if user is employee
   * @returns {boolean} True if user is employee
   */
  const isEmployee = () => {
    return isRole('EMPLOYEE');
  };

  return {
    permissions,
    can,
    canAll,
    canAny,
    isRole,
    isAdmin,
    isEmployee,
  };
}
