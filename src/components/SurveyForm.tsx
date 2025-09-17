import { useState } from 'react';

interface FormData {
  email: string;
  watch_duration: string;
  platform: string;
  community_need: string;
  profession: string;
  marital_status: string;
  gender: string;
  location: string;
  phone: string;
  telegram: string;
}

const SurveyForm = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    watch_duration: '',
    platform: '',
    community_need: '',
    profession: '',
    marital_status: '',
    gender: '',
    location: '',
    phone: '',
    telegram: ''
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Real-time email validation
    if (name === 'email') {
      const isValidEmail = e.target.checkValidity();
      setEmailError(!isValidEmail && value.trim() !== '');
    }
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Email validation
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setEmailError(true);
      return;
    }
    
    setEmailError(false);
    
    // Log form data (in real app, send to server)
    console.log('Form submitted!', formData);
    
    // Show success message
    setShowSuccess(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const RadioOption = ({ name, value, label, className = "" }: { 
    name: string; 
    value: string; 
    label: string; 
    className?: string;
  }) => (
    <label className={`custom-radio-label flex items-center p-3.5 border border-zinc-200 rounded-lg hover:bg-zinc-50 cursor-pointer transition-colors ${className}`}>
      <input 
        type="radio" 
        name={name} 
        value={value} 
        checked={formData[name as keyof FormData] === value}
        onChange={handleRadioChange}
        className="absolute opacity-0"
      />
      <span className="custom-radio-span relative h-5 w-5 rounded-full border-2 border-zinc-300 mr-3"></span>
      <span className="text-zinc-700">{label}</span>
    </label>
  );

  if (showSuccess) {
    return (
      <div className="container mx-auto max-w-2xl py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center mt-10">
          <div className="inline-block bg-green-100 p-4 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mt-4 text-zinc-900">Cảm ơn bạn đã đăng ký!</h2>
          <p className="text-zinc-600 mt-1">Thông tin đã được gửi thành công. Chào mừng bạn đến với cộng đồng N ơi!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl py-16 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-zinc-900 tracking-tight mb-3">
          Chào mừng bạn đến với Cộng đồng N ơi!
        </h1>
        <p className="text-lg text-zinc-600">
          Vui lòng dành vài phút chia sẻ thông tin. Điều này sẽ giúp chúng mình hiểu và hỗ trợ bạn tốt hơn.
        </p>
      </header>

      {/* Form Container */}
      <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-sm border border-zinc-200/80">
        <form onSubmit={handleSubmit} className="space-y-9">
          
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-md font-medium text-zinc-700 mb-2">
              Email của bạn <span className="text-red-500">*</span>
            </label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              required 
              placeholder="vidu@email.com" 
              value={formData.email}
              onChange={handleInputChange}
              className={`form-input w-full px-4 py-2.5 bg-zinc-100/80 border-zinc-200 rounded-lg transition duration-200 ease-in-out focus:bg-white ${emailError ? 'border-red-500' : ''}`}
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-2">Vui lòng nhập một địa chỉ email hợp lệ.</p>
            )}
          </div>

          {/* Question 1 */}
          <div>
            <label className="block text-md font-medium text-zinc-700 mb-3">
              1. Bạn đã xem video của NhiLe được bao lâu rồi?
            </label>
            <div className="space-y-2.5">
              <RadioOption name="watch_duration" value="new" label="Mới gần đây" />
              <RadioOption name="watch_duration" value="under_6m" label="Dưới 6 tháng" />
              <RadioOption name="watch_duration" value="6m_to_1y" label="Từ 6 tháng đến 1 năm" />
              <RadioOption name="watch_duration" value="over_1y" label="Trên 1 năm" />
            </div>
          </div>

          {/* Question 2 */}
          <div>
            <label className="block text-md font-medium text-zinc-700 mb-3">
              2. Bạn thường xem trên nền tảng nào nhất?
            </label>
            <div className="grid sm:grid-cols-2 gap-2.5">
              <RadioOption name="platform" value="youtube" label="YouTube" />
              <RadioOption name="platform" value="facebook" label="Facebook" />
              <RadioOption name="platform" value="tiktok" label="TikTok" />
              <RadioOption name="platform" value="other" label="Nền tảng khác" />
            </div>
          </div>

          {/* Question 3 */}
          <div>
            <label htmlFor="community_need" className="block text-md font-medium text-zinc-700 mb-2">
              3. Nhu cầu lớn nhất của bạn khi tham gia cộng đồng là gì?
            </label>
            <textarea 
              id="community_need" 
              name="community_need" 
              rows={4} 
              placeholder="Ví dụ: Học hỏi kiến thức, tìm kiếm sự hỗ trợ, kết nối bạn bè..." 
              value={formData.community_need}
              onChange={handleInputChange}
              className="form-textarea w-full px-4 py-2.5 bg-zinc-100/80 border-zinc-200 rounded-lg transition duration-200 ease-in-out focus:bg-white"
            />
          </div>

          {/* Question 4 */}
          <div>
            <label htmlFor="profession" className="block text-md font-medium text-zinc-700 mb-2">
              4. Bạn đang làm việc trong ngành nghề/lĩnh vực nào?
            </label>
            <input 
              type="text" 
              id="profession" 
              name="profession" 
              placeholder="Ví dụ: Công nghệ thông tin, Marketing, Sinh viên..." 
              value={formData.profession}
              onChange={handleInputChange}
              className="form-input w-full px-4 py-2.5 bg-zinc-100/80 border-zinc-200 rounded-lg transition duration-200 ease-in-out focus:bg-white"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-9">
            {/* Question 5 */}
            <div>
              <label className="block text-md font-medium text-zinc-700 mb-3">5. Tình trạng hôn nhân?</label>
              <div className="flex items-center space-x-4">
                <RadioOption name="marital_status" value="single" label="Độc thân" />
                <RadioOption name="marital_status" value="married" label="Đã kết hôn" />
              </div>
            </div>

            {/* Question 6 */}
            <div>
              <label className="block text-md font-medium text-zinc-700 mb-3">6. Giới tính của bạn?</label>
              <div className="flex items-center space-x-4">
                <RadioOption name="gender" value="male" label="Nam" />
                <RadioOption name="gender" value="female" label="Nữ" />
              </div>
            </div>
          </div>

          {/* Question 7 */}
          <div>
            <label htmlFor="location" className="block text-md font-medium text-zinc-700 mb-2">
              7. Bạn đang sinh sống ở đâu?
            </label>
            <input 
              type="text" 
              id="location" 
              name="location" 
              placeholder="Ví dụ: Hà Nội, Việt Nam hoặc Paris, Pháp" 
              value={formData.location}
              onChange={handleInputChange}
              className="form-input w-full px-4 py-2.5 bg-zinc-100/80 border-zinc-200 rounded-lg transition duration-200 ease-in-out focus:bg-white"
            />
          </div>
          
          {/* Optional Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Question 8 */}
            <div>
              <label htmlFor="phone" className="block text-md font-medium text-zinc-700 mb-2">
                8. Số điện thoại <span className="text-zinc-400">(Không bắt buộc)</span>
              </label>
              <input 
                type="tel" 
                id="phone" 
                name="phone" 
                placeholder="09xxxxxxxx" 
                value={formData.phone}
                onChange={handleInputChange}
                className="form-input w-full px-4 py-2.5 bg-zinc-100/80 border-zinc-200 rounded-lg transition duration-200 ease-in-out focus:bg-white"
              />
            </div>

            {/* Question 9 */}
            <div>
              <label htmlFor="telegram" className="block text-md font-medium text-zinc-700 mb-2">
                9. Username Telegram <span className="text-zinc-400">(Không bắt buộc)</span>
              </label>
              <input 
                type="text" 
                id="telegram" 
                name="telegram" 
                placeholder="@username_cua_ban" 
                value={formData.telegram}
                onChange={handleInputChange}
                className="form-input w-full px-4 py-2.5 bg-zinc-100/80 border-zinc-200 rounded-lg transition duration-200 ease-in-out focus:bg-white"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white font-semibold py-3.5 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transition-all transform active:scale-[0.98]"
            >
              Hoàn tất & Gửi thông tin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SurveyForm;