'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [menuItems, setMenuItems] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('whyHire');
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://virtualseoweb.pythonanywhere.com/menu-items/');
                setMenuItems(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Implement your update logic here
            // await axios.put(`your-api-endpoint/${formData.id}`, formData);
            alert('Data updated successfully!');
            setEditMode(false);
        } catch (err) {
            alert('Error updating data');
        }
    };

    if (loading) return <div className="text-center py-8">Loading...</div>;
    if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">SEO Agency Dashboard</h1>

            {/* Navigation Tabs */}
            <div className="flex border-b mb-6">
                <button
                    className={`py-2 px-4 ${activeTab === 'whyHire' ? 'border-b-2 border-blue-500 font-medium' : ''}`}
                    onClick={() => setActiveTab('whyHire')}
                >
                    Why Hire Agency
                </button>
                <button
                    className={`py-2 px-4 ${activeTab === 'howWeWork' ? 'border-b-2 border-blue-500 font-medium' : ''}`}
                    onClick={() => setActiveTab('howWeWork')}
                >
                    How We Work
                </button>
                <button
                    className={`py-2 px-4 ${activeTab === 'industries' ? 'border-b-2 border-blue-500 font-medium' : ''}`}
                    onClick={() => setActiveTab('industries')}
                >
                    Industries
                </button>
                <button
                    className={`py-2 px-4 ${activeTab === 'faq' ? 'border-b-2 border-blue-500 font-medium' : ''}`}
                    onClick={() => setActiveTab('faq')}
                >
                    FAQs
                </button>
            </div>

            {/* Main Content */}
            <div className="bg-white rounded-lg shadow p-6">
                {activeTab === 'whyHire' && (
                    <WhyHireSection
                        data={menuItems.Why_Hire_Agency}
                        mainHeading={menuItems.Why_Hire_Agency_Main_Heading}
                        editMode={editMode}
                        setEditMode={setEditMode}
                        formData={formData}
                        setFormData={setFormData}
                        handleInputChange={handleInputChange}
                        handleSubmit={handleSubmit}
                    />
                )}

                {activeTab === 'howWeWork' && (
                    <HowWeWorkSection
                        data={menuItems.How_We_Work_Step}
                        mainHeading={menuItems.How_We_Work_Step_Heading}
                        editMode={editMode}
                        setEditMode={setEditMode}
                        formData={formData}
                        setFormData={setFormData}
                        handleInputChange={handleInputChange}
                        handleSubmit={handleSubmit}
                    />
                )}

                {activeTab === 'industries' && (
                    <IndustriesSection
                        data={menuItems.Industries_We_Delivered_Results}
                        mainHeading={menuItems.Industries_We_Delivered_Results_Heading}
                        editMode={editMode}
                        setEditMode={setEditMode}
                        formData={formData}
                        setFormData={setFormData}
                        handleInputChange={handleInputChange}
                        handleSubmit={handleSubmit}
                    />
                )}

                {activeTab === 'faq' && (
                    <FAQSection
                        data={menuItems.FAQ}
                        editMode={editMode}
                        setEditMode={setEditMode}
                        formData={formData}
                        setFormData={setFormData}
                        handleInputChange={handleInputChange}
                        handleSubmit={handleSubmit}
                    />
                )}
            </div>
        </div>
    );
};

const WhyHireSection = ({ data, mainHeading, editMode, setEditMode, formData, setFormData, handleInputChange, handleSubmit }) => {
    const handleEdit = (item) => {
        setFormData(item);
        setEditMode(true);
    };

    // Add these safeguards
    if (!data) return <div className="text-center py-8">Loading data...</div>;
    if (!Array.isArray(data)) return <div className="text-center py-8">Data format error</div>;


    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">{mainHeading || 'Why Hire Agency'}</h2>
                {!editMode && (
                    <button
                        onClick={() => setEditMode(true)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Add New Item
                    </button>
                )}
            </div>

            {editMode ? (
                <form onSubmit={handleSubmit} className="mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Image Icon URL</label>
                            <input
                                type="text"
                                name="Why_Hire_Agency_image_icon"
                                value={formData.Why_Hire_Agency_image_icon || ''}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input
                                type="text"
                                name="Why_Hire_Agency_title"
                                value={formData.Why_Hire_Agency_title || ''}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                                name="Why_Hire_Agency_description"
                                value={formData.Why_Hire_Agency_description || ''}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                                rows="3"
                            />
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                            Save
                        </button>
                        <button
                            type="button"
                            onClick={() => setEditMode(false)}
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {data.map((item) => (
                        <div key={item.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-2">
                                <img
                                    src={item.Why_Hire_Agency_image_icon}
                                    alt={item.Why_Hire_Agency_title}
                                    className="w-12 h-12 object-contain mb-3"
                                />
                                <button
                                    onClick={() => handleEdit(item)}
                                    className="text-blue-500 hover:text-blue-700 text-sm"
                                >
                                    Edit
                                </button>
                            </div>
                            <h3 className="font-bold text-lg mb-2">{item.Why_Hire_Agency_title}</h3>
                            <p className="text-gray-600">{item.Why_Hire_Agency_description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

// How We Work Section Component
const HowWeWorkSection = ({ data, mainHeading, editMode, setEditMode, formData, setFormData, handleInputChange, handleSubmit }) => {
    const handleEdit = (item) => {
        setFormData(item);
        setEditMode(true);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">{mainHeading}</h2>
                {!editMode && (
                    <button
                        onClick={() => setEditMode(true)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Add New Step
                    </button>
                )}
            </div>

            {editMode ? (
                <form onSubmit={handleSubmit} className="mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Step Title</label>
                            <input
                                type="text"
                                name="How_We_Work_Step_Title"
                                value={formData.How_We_Work_Step_Title || ''}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Image Icon URL</label>
                            <input
                                type="text"
                                name="How_We_Work_Step_image_icon"
                                value={formData.How_We_Work_Step_image_icon || ''}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                                name="How_We_Work_Step_short_description"
                                value={formData.How_We_Work_Step_short_description || ''}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                                rows="5"
                            />
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                            Save
                        </button>
                        <button
                            type="button"
                            onClick={() => setEditMode(false)}
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            ) : (
                <div className="space-y-6">
                    {data.map((item) => (
                        <div key={item.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center">
                                    <img
                                        src={item.How_We_Work_Step_image_icon}
                                        alt={item.How_We_Work_Step_Title}
                                        className="w-16 h-16 object-contain mr-4"
                                    />
                                    <h3 className="font-bold text-xl">{item.How_We_Work_Step_Title}</h3>
                                </div>
                                <button
                                    onClick={() => handleEdit(item)}
                                    className="text-blue-500 hover:text-blue-700"
                                >
                                    Edit
                                </button>
                            </div>
                            <p className="text-gray-600 pl-20">{item.How_We_Work_Step_short_description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

// Industries Section Component
const IndustriesSection = ({ data, mainHeading, editMode, setEditMode, formData, setFormData, handleInputChange, handleSubmit }) => {
    const handleEdit = (item) => {
        setFormData(item);
        setEditMode(true);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">{mainHeading}</h2>
                {!editMode && (
                    <button
                        onClick={() => setEditMode(true)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Add New Industry
                    </button>
                )}
            </div>

            {editMode ? (
                <form onSubmit={handleSubmit} className="mb-8">
                    <div className="grid grid-cols-1 gap-6 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Industry Name</label>
                            <input
                                type="text"
                                name="Industries_We_Delivered_Results_name"
                                value={formData.Industries_We_Delivered_Results_name || ''}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                            Save
                        </button>
                        <button
                            type="button"
                            onClick={() => setEditMode(false)}
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {data.map((item) => (
                        <div key={item.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-center">
                                <h3 className="font-medium">{item.Industries_We_Delivered_Results_name}</h3>
                                <button
                                    onClick={() => handleEdit(item)}
                                    className="text-blue-500 hover:text-blue-700 text-sm"
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

// FAQ Section Component
const FAQSection = ({ data, editMode, setEditMode, formData, setFormData, handleInputChange, handleSubmit }) => {
    const handleEdit = (item) => {
        setFormData(item);
        setEditMode(true);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
                {!editMode && (
                    <button
                        onClick={() => setEditMode(true)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Add New FAQ
                    </button>
                )}
            </div>

            {editMode ? (
                <form onSubmit={handleSubmit} className="mb-8">
                    <div className="grid grid-cols-1 gap-6 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Question</label>
                            <input
                                type="text"
                                name="FAQ_heading"
                                value={formData.FAQ_heading || ''}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Answer</label>
                            <textarea
                                name="FAQ_content"
                                value={formData.FAQ_content || ''}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                                rows="4"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <input
                                type="text"
                                name="category"
                                value={formData.category || ''}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                            Save
                        </button>
                        <button
                            type="button"
                            onClick={() => setEditMode(false)}
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            ) : (
                <div className="space-y-4">
                    {data.map((item) => (
                        <div key={item.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold text-lg mb-2">{item.FAQ_heading}</h3>
                                    <p className="text-gray-600">{item.FAQ_content}</p>
                                    {item.category && (
                                        <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded mt-2">
                                            {item.category}
                                        </span>
                                    )}
                                </div>
                                <button
                                    onClick={() => handleEdit(item)}
                                    className="text-blue-500 hover:text-blue-700"
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;