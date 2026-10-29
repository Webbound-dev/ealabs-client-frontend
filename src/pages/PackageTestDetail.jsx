import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Clock, FileText, Users, TestTube, CheckCircle, Package } from "lucide-react";
import Button from "../components/ui/common/Button";
import { getTestsByPackageName } from "../api/apis/packagecategory";
import Loading from "../components/Loading";
import { useEffect } from "react";
import SEO from "../components/SEO";

const packageMetaData = {
    "complete-health-profile": "CompleteHealthProfile",
    "basic-health-profile": "BasicHealthProfile",
    "diabetes-profile": "DiabetesProfile",
    "basic-thyroid-profile": "BasicThyroidProfile",
    "comprehensive-thyroid-profile": "ComprehensiveThyroidProfile",
    "pre-operative-profile": "PreOperativeProfile",
    "kids-special-profile": "KidsSpecialProfile",
    "iron-deficiency-profile": "IronDeficiencyProfile",
    "vitamin-profile": "VitaminProfilePackage",
    "antenatal-profile": "AntenatalProfile"
};

const PackageTestDetail = () => {
    const navigate = useNavigate();
    const { name } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const { data, isLoading, isError } = useQuery({
        queryKey: ["tests", name],
        queryFn: () => getTestsByPackageName(name),
        enabled: !!name,
    });

    const packageInfo = data?.package;
    const tests = data?.tests || [];

    const handleBack = () => {
        navigate("/", { state: { scrollToCheckupSection: true } });
    };

    if (isLoading) {
        return <Loading message="Loading Package Details..." />;
    }

    if (isError) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
                <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center border border-gray-200">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-3xl">⚠️</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Package</h2>
                    <p className="text-gray-600 mb-6">We couldn't fetch the package details. Please try again.</p>
                    <Button onClick={handleBack} className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors">
                        Go Back
                    </Button>
                </div>
            </div>
        );
    }

    if (!tests || tests.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
                <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center border border-gray-200">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <TestTube className="w-8 h-8 text-gray-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">No Tests Found</h2>
                    <p className="text-gray-600 mb-6">This package doesn't have any tests available.</p>
                    <Button onClick={handleBack} className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors">
                        Go Back
                    </Button>
                </div>
            </div>
        );
    }

    const renderArray = (arr) => {
        if (!arr || arr.length === 0) {
            return <span className="text-gray-400 text-sm italic">Not specified</span>;
        }

        const firstItem = arr[0];
        if (typeof firstItem === "object" && firstItem !== null) {
            return (
                <ul className="space-y-2 mt-2">
                    {arr.map((item, index) => (
                        <li key={index} className="text-sm bg-gray-50 p-3 rounded-lg border border-gray-200">
                            {Object.entries(item)
                                .filter(([key]) => key !== "_id")
                                .map(([key, value], idx) => (
                                    <div key={key} className={idx > 0 ? "mt-1.5" : ""}>
                                        <span className="font-semibold text-gray-800 capitalize">{key}:</span>{" "}
                                        <span className="text-gray-600">
                                            {Array.isArray(value) ? value.join(", ") : value}
                                        </span>
                                    </div>
                                ))}
                        </li>
                    ))}
                </ul>
            );
        } else {
            return <span className="text-gray-700 text-sm">{arr.join(", ")}</span>;
        }
    };

    const seoPageKey = packageMetaData[name] || null;

    return (
        <>
            <SEO pageKey={seoPageKey} />
            <div className="min-h-screen bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 md:py-8">

                    <Button
                        onClick={handleBack}
                        className="cursor-pointer flex items-center gap-2 mb-4 sm:mb-6 text-gray-700 hover:text-gray-900 font-medium transition-all hover:gap-3 group text-sm sm:text-base"
                    >
                        <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </Button>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-4 md:p-6 bg-white rounded-2xl shadow-sm border border-gray-100 mb-8">

                        <div className="flex items-start gap-4 md:gap-6">
                            <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0">
                                <Package className="w-6 h-6 md:w-8 md:h-8 text-gray-600" />
                            </div>

                            <div className="space-y-1">
                                <h1 className="text-lg md:text-xl lg:text-2xl font-extrabold text-gray-900 tracking-tight">
                                    {packageInfo?.name || "Premium Health Package"}
                                </h1>
                                <div className="flex items-center gap-2 text-gray-500 font-medium">
                                    <TestTube className="w-4 h-4 text-gray-500" />
                                    <span className="text-sm md:text-base">
                                        {tests.length} {tests.length === 1 ? "test" : "tests"} included
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center pt-4 md:pt-0 border-t md:border-t-0 border-gray-100">
                            <p className="text-gray-400 text-sm md:text-base">
                                Package Price
                            </p>
                            <div className="flex items-baseline gap-1">
                                <span className="text-xl md:text-2xl lg:text-3xl font-black text-gray-900">
                                    ₹{packageInfo?.price}
                                </span>
                            </div>
                        </div>

                    </div>

                    <div className="mb-4 sm:mb-6">
                        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1">
                            Included Tests
                        </h2>
                        <p className="text-gray-600 text-sm sm:text-base">
                            Complete details of each diagnostic test
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
                        {tests.map((test) => (
                            <div
                                key={test._id}
                                className="bg-white rounded-xl border border-gray-200 shadow-sm
                 hover:shadow-lg hover:-translate-y-1
                 transition-all duration-300 p-4 sm:p-5 flex flex-col"
                            >
                                {(test.sampleType ||
                                    test.sampleVolume ||
                                    test.testMethod ||
                                    test.turnaroundTime) && (
                                        <div className="mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-7 h-7 sm:w-7 sm:h-7 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                                                    <TestTube className="w-4 h-4 text-gray-700" />
                                                </div>

                                                <h3 className="font-semibold text-gray-900 text-sm sm:text-base leading-tight">
                                                    {test.name}
                                                </h3>
                                            </div>

                                            <div className="mt-3 ml-10 text-xs sm:text-sm text-gray-600 space-y-1">
                                                {test.sampleType && (
                                                    <p>
                                                        <span className="font-medium text-gray-800">Type:</span>{" "}
                                                        {test.sampleType}
                                                    </p>
                                                )}
                                                {test.sampleVolume && (
                                                    <p>
                                                        <span className="font-medium text-gray-800">Volume:</span>{" "}
                                                        {test.sampleVolume}
                                                    </p>
                                                )}
                                                {test.testMethod && (
                                                    <p>
                                                        <span className="font-medium text-gray-800">Method:</span>{" "}
                                                        {test.testMethod}
                                                    </p>
                                                )}
                                                {test.turnaroundTime && (
                                                    <p>
                                                        <span className="font-medium text-gray-800">Turnaround:</span>{" "}
                                                        {test.turnaroundTime}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    )}


                                <div className="mt-auto pt-4 border-t border-gray-100">
                                    <div className="flex items-start gap-3">
                                        <div className="w-7 h-7 sm:w-7 sm:h-7 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                                            <FileText className="w-4 h-4 text-gray-700" />
                                        </div>

                                        <div>
                                            <h4 className="font-semibold text-gray-900 text-sm sm:text-base">
                                                Special Instructions
                                            </h4>
                                            <p className="mt-1 text-xs sm:text-sm text-gray-600 leading-relaxed">
                                                {test.specialInstructions ? test.specialInstructions : "Not Provided"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </>
    );

};

export default PackageTestDetail;