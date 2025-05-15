import React, { useEffect, useState } from "react";
import "./AccountManagement.css";
import { FiSearch, FiFilter } from "react-icons/fi";
import { getAllAccounts, updateAccount } from "../../services/auth";

const AccountManagement = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const fetchAccounts = async () => {
    try {
      const response = await getAllAccounts();
      console.log("Danh sách tài khoản:", response.data.data);
      setAccounts(response.data.data);
    } catch (err) {
      console.error("Lỗi khi lấy danh sách tài khoản:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const handleUpdate = async (id, field, value) => {
    try {
      await updateAccount(id, { [field]: value });
      setAccounts((prev) =>
        prev.map((acc) => (acc._id === id ? { ...acc, [field]: value } : acc))
      );
    } catch (err) {
      console.error("Lỗi khi cập nhật tài khoản:", err);
    }
  };

  const filteredAccounts = accounts.filter((account) => {
    const matchSearch =
      account.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.email?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchRole = roleFilter ? account.role === roleFilter : true;
    const matchStatus = statusFilter ? account.status === statusFilter : true;

    return matchSearch && matchRole && matchStatus;
  });

  if (loading) return <p>Đang tải tài khoản...</p>;

  return (
    <div className="manage-accounts">
      <h2>Quản lý tài khoản</h2>

      <div className="account-filters">
        <div className="filter-group">
          <FiSearch className="icon" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <FiFilter className="icon" />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="">Tất cả</option>
            <option value="user">Khách hàng</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Trạng thái</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">Tất cả</option>
            <option value="active">Hoạt động</option>
            <option value="inactive">Khóa</option>
          </select>
        </div>
      </div>

      {filteredAccounts.length === 0 ? (
        <p>Không có tài khoản được tìm thấy.</p>
      ) : (
        <div className="account-table-container">
          <table className="account-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên</th>
                <th>Email</th>
                <th>Vai trò</th>
                <th>Trạng thái</th>
                <th>Thời gian tạo</th>
              </tr>
            </thead>
            <tbody>
              {filteredAccounts.map((acc) => (
                <tr key={acc._id}>
                  <td>{acc._id}</td>
                  <td>{acc.name || "No name"}</td>
                  <td>{acc.email}</td>
                  <td>
                    <select
                      value={acc.role}
                      onChange={(e) =>
                        handleUpdate(acc._id, "role", e.target.value)
                      }
                    >
                      <option value="user">Khách hàng</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td>
                    <select
                      value={acc.status}
                      onChange={(e) =>
                        handleUpdate(acc._id, "status", e.target.value)
                      }
                    >
                      <option value="active">Hoạt động</option>
                      <option value="inactive">Khóa</option>
                    </select>
                  </td>
                  <td>{new Date(acc.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AccountManagement;
