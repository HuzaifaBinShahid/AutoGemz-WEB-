import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { vehicleService, type Vehicle } from "../services/vehicleService";
import EditIcon from "../components/svgs/EditIcon";
import DeleteIcon from "../components/svgs/DeleteIcon";
import DeleteModal from "../components/common/DeleteModal";
import AssignConfirmationModal from "../components/common/AssignConfirmationModal";
import { userService } from "../services/userService";
import { inspectionService } from "../services/inspectionService";

const VehicleDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedInspectorId, setSelectedInspectorId] = useState("");
  const [showAssignModal, setShowAssignModal] = useState(false);

  const [editForm, setEditForm] = useState<Partial<Vehicle>>({
    make: "",
    model: "",
    year: 0,
    transmission: "automatic",
    vin: "",
    mileage: 0,
    price: 0,
    description: "",
    additionalDetails: "",
    city: "",
    state: "",
    mobileNumber: "",
    secondaryNumber: "",
    allowWhatpsAppContact: true,
    freeinspectionRequest: true,
  });

  const { data: vehicle, isLoading, isError, error } = useQuery({
    queryKey: ['vehicle', id],
    queryFn: () => vehicleService.getVehicleById(id!),
    enabled: !!id,
  });
  
  const { data: usersResponse } = useQuery({
    queryKey: ['inspectors-list'],
    queryFn: () => userService.getUsers({ limit: 100 }),
  });

  useEffect(() => {
    if (isError) {
      toast.error((error as any)?.response?.data?.message || "Error loading vehicle details");
    }
  }, [isError, error]);

  useEffect(() => {
    if (vehicle) {
      setEditForm({
        make: vehicle.make || "",
        model: vehicle.model || "",
        year: vehicle.year || 0,
        transmission: vehicle.transmission || "automatic",
        vin: vehicle.vin || "",
        mileage: vehicle.mileage || 0,
        price: vehicle.price || 0,
        description: vehicle.description || "",
        additionalDetails: vehicle.additionalDetails || "",
        city: vehicle.city || "",
        state: vehicle.state || "",
        mobileNumber: vehicle.mobileNumber || "",
        secondaryNumber: vehicle.secondaryNumber || "",
        allowWhatpsAppContact: vehicle.allowWhatpsAppContact ?? true,
        freeinspectionRequest: vehicle.freeinspectionRequest ?? true,
      });
    }
  }, [vehicle]);

  const updateMutation = useMutation({
    mutationFn: (payload: Partial<Vehicle>) => vehicleService.updateVehicle(id!, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicle', id] });
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
      toast.success("Vehicle updated successfully");
      setIsEditing(false);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update vehicle");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => vehicleService.deleteVehicle(id!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
      toast.success("Vehicle deleted successfully");
      navigate("/my-vehicles");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete vehicle");
    },
  });

  const assignMutation = useMutation({
    mutationFn: (inspectorId: string) => inspectionService.assignInspector(id!, inspectorId),
    onSuccess: () => {
      toast.success("Vehicle assigned successfully");
      setShowAssignModal(false);
      setSelectedInspectorId("");
      queryClient.invalidateQueries({ queryKey: ["vehicle", id] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to assign vehicle");
    },
  });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setEditForm(prev => ({
      ...prev,
      [name]: val
    }));
  };

  const handleSave = () => {
    updateMutation.mutate(editForm);
  };

  const handleDeleteClick = () => setShowDeleteModal(true);
  const handleDeleteConfirm = () => {
    deleteMutation.mutate();
    setShowDeleteModal(false);
  };
  const handleDeleteCancel = () => setShowDeleteModal(false);

  if (isLoading) return <div className="p-6">Loading vehicle details...</div>;
  if (isError || !vehicle) return <div className="p-6 text-red-500">Error loading vehicle details.</div>;

  return (
    <div className="p-6 bg-[#F2F2F2] min-h-screen">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Vehicle Details</h2>
          <div className="flex items-center gap-4">
            {!isEditing && (
              <div className="flex items-center gap-2 border-r pr-4 border-gray-200">
                <select
                  className="p-2 border border-gray-300 rounded focus:border-autogemz-orange focus:outline-none text-gray-900 bg-white min-w-[200px] text-sm"
                  value={selectedInspectorId}
                  onChange={(e) => setSelectedInspectorId(e.target.value)}
                >
                  <option value="">Assign Vehicle</option>
                  {usersResponse?.results.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.fullName || user.username} ({user.role})
                    </option>
                  ))}
                </select>
                <button
                  disabled={!selectedInspectorId || assignMutation.isPending}
                  onClick={() => setShowAssignModal(true)}
                  className="px-4 py-2 bg-autogemz-orange text-white rounded hover:bg-opacity-90 disabled:opacity-50 uppercase font-semibold text-sm h-[38px]"
                >
                  Assign
                </button>
              </div>
            )}
            <div className="flex gap-2">
            {!isEditing ? (
              <>
                <button
                  onClick={handleEditToggle}
                  className="p-2 rounded transition-colors bg-autogemz-orange hover:bg-opacity-90"
                >
                  <EditIcon />
                </button>
                <button
                  onClick={handleDeleteClick}
                  className="p-2 rounded transition-colors bg-[#DC3729] hover:bg-opacity-90"
                >
                  <DeleteIcon />
                </button>
              </>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  disabled={updateMutation.isPending}
                  className="px-4 py-2 bg-autogemz-orange text-white rounded hover:bg-opacity-90 disabled:opacity-50"
                >
                  {updateMutation.isPending ? "Saving..." : "Save"}
                </button>
                <button
                  onClick={handleEditToggle}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Image Section */}
            <div className="w-full md:w-1/3">
              <div className="aspect-video bg-gray-100 rounded overflow-hidden mb-4">
                <img
                  src={vehicle.images?.[0] || "https://placehold.co/600x400?text=No+Image"}
                  alt={vehicle.model}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {vehicle.images?.slice(1, 5).map((img, idx) => (
                  <div key={idx} className="aspect-square bg-gray-50 rounded overflow-hidden">
                    <img src={img} alt={`Vehicle ${idx}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>

            {/* Details Section */}
            <div className="flex-1">
              {!isEditing ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  <DetailItem label="Make" value={vehicle.make} />
                  <DetailItem label="Model" value={vehicle.model} />
                  <DetailItem label="Year" value={vehicle.year} />
                  <DetailItem label="Transmission" value={vehicle.transmission} />
                  <DetailItem label="VIN" value={vehicle.vin} />
                  <DetailItem label="Mileage" value={`${vehicle.mileage?.toLocaleString()} km`} />
                  <DetailItem label="Price" value={`AED ${vehicle.price?.toLocaleString()}`} />
                  <DetailItem label="City" value={vehicle.city} />
                  <DetailItem label="State" value={vehicle.state} />
                  <DetailItem label="Mobile" value={vehicle.mobileNumber} />
                  <DetailItem label="WhatsApp Contact" value={vehicle.allowWhatpsAppContact ? "Yes" : "No"} />
                  <div className="col-span-2">
                    <p className="text-sm text-gray-600 mb-1">Description</p>
                    <p className="text-gray-900 font-medium whitespace-pre-wrap">{vehicle.description || "No description provided."}</p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputItem label="Make" name="make" value={editForm.make} onChange={handleInputChange} />
                  <InputItem label="Model" name="model" value={editForm.model} onChange={handleInputChange} />
                  <InputItem label="Year" name="year" type="number" value={editForm.year} onChange={handleInputChange} />
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Transmission</label>
                    <select
                      name="transmission"
                      value={editForm.transmission}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded focus:border-autogemz-orange focus:outline-none text-gray-900 bg-white"
                    >
                      <option value="automatic">Automatic</option>
                      <option value="manual">Manual</option>
                    </select>
                  </div>
                  <InputItem label="VIN" name="vin" value={editForm.vin} onChange={handleInputChange} />
                  <InputItem label="Mileage" name="mileage" type="number" value={editForm.mileage} onChange={handleInputChange} />
                  <InputItem label="Price" name="price" type="number" value={editForm.price} onChange={handleInputChange} />
                  <InputItem label="City" name="city" value={editForm.city} onChange={handleInputChange} />
                  <InputItem label="State" name="state" value={editForm.state} onChange={handleInputChange} />
                  <InputItem label="Mobile Number" name="mobileNumber" value={editForm.mobileNumber} onChange={handleInputChange} />
                  <div className="col-span-2">
                    <label className="text-sm text-gray-600 mb-1 block">Description</label>
                    <textarea
                      name="description"
                      value={editForm.description}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full p-2 border border-gray-300 rounded focus:border-autogemz-orange focus:outline-none text-gray-900 bg-white"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="DELETE VEHICLE?"
        message="Are you sure you want to delete this vehicle listing?"
      />

      <AssignConfirmationModal
        isOpen={showAssignModal}
        onClose={() => setShowAssignModal(false)}
        onConfirm={() => assignMutation.mutate(selectedInspectorId)}
        userName={
          usersResponse?.results.find((u) => u.id === selectedInspectorId)?.fullName || 
          usersResponse?.results.find((u) => u.id === selectedInspectorId)?.username || 
          ""
        }
        isLoading={assignMutation.isPending}
      />
    </div>
  );
};

const DetailItem = ({ label, value }: { label: string; value: string | number | undefined }) => (
  <div>
    <p className="text-sm text-gray-600 mb-1">{label}</p>
    <p className="text-gray-900 font-medium">{value ?? "N/A"}</p>
  </div>
);

const InputItem = ({ label, name, value, type = "text", onChange }: { 
  label: string; 
  name: string; 
  value: any; 
  type?: string; 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void 
}) => (
  <div>
    <label className="text-sm text-gray-600 mb-1 block">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-2 border border-gray-300 rounded focus:border-autogemz-orange focus:outline-none text-gray-900 bg-white"
    />
  </div>
);

export default VehicleDetails;
