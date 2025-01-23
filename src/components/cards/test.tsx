import React, { useState } from 'react'
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiDollarSign,
  FiCreditCard,
  FiTrash2,
  FiEdit2,
  FiCheck,
  FiX
} from 'react-icons/fi'

const EmployeeKanbanCard = ({
  employee = {
    id: 'EMP001',
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    idDocument: 'ID123456',
    phone: '+1 234 567 8900',
    address: '123 Business Street, Tech City, TC 12345',
    hireDate: '2023-01-15',
    salary: '75000',
    status: 'Active',
    image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400',
    roleId: 'ROLE_001',
    roles: 'Senior Developer'
  },
  isAdmin = true,
  onDelete
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isEditing, setIsEditing] = useState(true)
  const [editedEmployee, setEditedEmployee] = useState(employee)

  const handleViewMore = () => {
    setIsExpanded(!isExpanded)
    console.log('View More clicked for employee:', employee.id)
  }

  const handleEdit = () => {
    setIsEditing(!isEditing)
    if (!isEditing) {
      setEditedEmployee(employee)
    }
  }

  const handleSave = () => {
    // Here you would typically make an API call to update the employee
    console.log('Saving employee:', editedEmployee)
    setIsEditing(false)
  }

  const handleInputChange = (field, value) => {
    setEditedEmployee((prev) => ({
      ...prev,
      [field]: value
    }))
  }

  const EditableField = ({ icon: Icon, field, value, label }) => (
    <div className="flex items-center space-x-2 text-gray-600">
      <Icon className="text-gray-400" />
      {isEditing && isAdmin ? (
        <input
          type="text"
          value={value}
          onChange={(e) => handleInputChange(field, e.target.value)}
          className="text-sm bg-gray-50 border border-gray-200 rounded px-2 py-1 w-full"
        />
      ) : (
        <span className="text-sm">{label || value}</span>
      )}
    </div>
  )

  return (
    <div
      className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 m-4 border border-gray-200"
      role="article"
      aria-label={`Employee card for ${employee.firstName} ${employee.lastName}`}
    >
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img
            src={employee.image}
            alt={`${employee.firstName} ${employee.lastName}`}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-200"
            onError={(e) => {
              e.target.src =
                'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400'
            }}
          />
          <div>
            {isEditing && isAdmin ? (
              <div className="space-y-1">
                <input
                  type="text"
                  value={editedEmployee.firstName}
                  onChange={(e) =>
                    handleInputChange('firstName', e.target.value)
                  }
                  className="text-lg font-semibold bg-gray-50 border border-gray-200 rounded px-2 py-1"
                />
                <input
                  type="text"
                  value={editedEmployee.lastName}
                  onChange={(e) =>
                    handleInputChange('lastName', e.target.value)
                  }
                  className="text-lg font-semibold bg-gray-50 border border-gray-200 rounded px-2 py-1"
                />
              </div>
            ) : (
              <h2 className="text-lg font-semibold text-gray-800">
                {employee.firstName} {employee.lastName}
              </h2>
            )}
            <EditableField
              icon={FiUser}
              field="roles"
              value={editedEmployee.roles}
            />
          </div>
        </div>
        {isAdmin && (
          <div className="flex space-x-2">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="p-1 text-green-600 hover:bg-green-50 rounded"
                  aria-label="Save changes"
                >
                  <FiCheck />
                </button>
                <button
                  onClick={handleEdit}
                  className="p-1 text-red-600 hover:bg-red-50 rounded"
                  aria-label="Cancel editing"
                >
                  <FiX />
                </button>
              </>
            ) : (
              <button
                onClick={handleEdit}
                className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                aria-label="Edit employee"
              >
                <FiEdit2 />
              </button>
            )}
            <button
              onClick={onDelete}
              className="p-1 text-red-600 hover:bg-red-50 rounded"
              aria-label="Delete employee"
            >
              <FiTrash2 />
            </button>
          </div>
        )}
      </div>

      <div className="px-4 pb-4">
        <div className="space-y-2">
          <EditableField
            icon={FiCreditCard}
            field="id"
            value={editedEmployee.id}
            label={`ID: ${editedEmployee.id}`}
          />
          <EditableField
            icon={FiMail}
            field="email"
            value={editedEmployee.email}
          />
          <EditableField
            icon={FiPhone}
            field="phone"
            value={editedEmployee.phone}
          />

          {isExpanded && (
            <div className="space-y-2 pt-2 border-t border-gray-100 mt-2">
              <EditableField
                icon={FiMapPin}
                field="address"
                value={editedEmployee.address}
              />
              <EditableField
                icon={FiCalendar}
                field="hireDate"
                value={editedEmployee.hireDate}
                label={`Hired: ${editedEmployee.hireDate}`}
              />
              <EditableField
                icon={FiDollarSign}
                field="salary"
                value={editedEmployee.salary}
                label={`$${editedEmployee.salary}/year`}
              />
              <EditableField
                icon={FiUser}
                field="status"
                value={editedEmployee.status}
                label={`Status: ${editedEmployee.status}`}
              />
            </div>
          )}
        </div>

        <button
          onClick={handleViewMore}
          className="mt-4 w-full bg-gray-50 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-200 text-sm font-medium"
          aria-expanded={isExpanded}
          aria-label={
            isExpanded
              ? 'Show less employee details'
              : 'Show more employee details'
          }
        >
          {isExpanded ? 'View Less' : 'View More'}
        </button>
      </div>
    </div>
  )
}

export default EmployeeKanbanCard
