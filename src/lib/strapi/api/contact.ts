// Contact API utilities for Strapi V5

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

// Interface cho Contact data
export interface ContactFormData {
  name: string;
  phoneNumber: string;
  title: string;
  description: string;
  email: string;
}

export interface ContactResponse {
  data: {
    id: number;
    documentId: string;
    name: string;
    phoneNumber: string;
    title: string;
    description: string;
    email: string;
    contactStatus: boolean;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  } | null;
  error?: {
    status: number;
    name: string;
    message: string;
    details?: any;
  };
}

// Submit contact form to Strapi
export async function submitContact(
  formData: ContactFormData
): Promise<ContactResponse> {
  console.log("\n📧 [submitContact] Submitting contact form...");
  console.log("📦 [Data]", formData);

  try {
    const response = await fetch(`${STRAPI_URL}/api/contacts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          name: formData.name,
          phoneNumber: formData.phoneNumber,
          title: formData.title,
          description: formData.description,
          email: formData.email,
          contactStatus: false, // Mặc định chưa liên hệ
        },
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("❌ [submitContact] Error:", result.error);
      return {
        data: null,
        error: result.error,
      };
    }

    console.log("✅ [submitContact] Success! ID:", result.data?.id);
    return {
      data: result.data,
    };
  } catch (error) {
    console.error("❌ [submitContact] Network Error:", error);
    return {
      data: null,
      error: {
        status: 500,
        name: "NetworkError",
        message: "Không thể kết nối đến server. Vui lòng thử lại sau.",
      },
    };
  }
}

