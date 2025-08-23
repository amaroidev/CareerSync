import Header from "@/components/shared/Header";
import MobileNavigation from "@/components/shared/MobileNavigation";
import ApplicationBoard from "@/components/dashboard/ApplicationBoard";

export default function Applications() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2" data-testid="text-applications-title">
            Application Tracker
          </h1>
          <p className="text-gray-600">Manage and track all your job and scholarship applications</p>
        </div>

        <ApplicationBoard />
      </div>

      <MobileNavigation />
    </div>
  );
}
