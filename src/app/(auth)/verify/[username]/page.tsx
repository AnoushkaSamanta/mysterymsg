// "use client";
// import { Button } from "@/components/ui/button";
// import {
//     Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { verifySchema } from "@/schemas/verifySchema";
// import { ApiResponse } from "@/types/ApiResponse";
// import { zodResolver } from "@hookform/resolvers/zod";
// import axios, { AxiosError } from "axios";
// import { useParams, useRouter } from "next/navigation";
// import React from "react";
// import { useForm } from "react-hook-form";
// import { toast } from "sonner";
// import * as z from "zod";
// const VerifyAccount = () => {
//   const router = useRouter();
//   const params = useParams<{ username: string }>();

//   const form = useForm<z.infer<typeof verifySchema>>({
//     resolver: zodResolver(verifySchema),
//   });

//   const onSubmit = async (data: z.infer<typeof verifySchema>) => {
//     try {
//       const response = await axios.post<ApiResponse>(`/api/verify-code`, {
//         username: params.username,
//         code: data.code,
//       });
//       toast.success("Success", {
//         description: response.data.message,
//       });

//       router.replace("/sign-in");
//     } catch (error) {
//       console.error("Error in signup of user", error);
//       const axiosError = error as AxiosError<ApiResponse>;
//       let errorMessage = axiosError.response?.data.message;
//       toast("Signup failed", {
//         description: errorMessage,
//       });
//     }
//   };
//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-800">
//       <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
//         <div className="text-center">
//           <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
//             Verify Your Account
//           </h1>
//           <p className="mb-4">
//             Enter the verification code sent to your email.
//           </p>
//         </div>
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//             <FormField
//             name="code"
//               control={form.control}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Verification Code</FormLabel>
//                   <FormControl>
//                     <Input placeholder="code" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <Button type="submit">Submit</Button>
//           </form>
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default VerifyAccount;



"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

// Define verification schema inline since it's simple
const verifySchema = z.object({
  code: z
    .string()
    .min(6, { message: "Verification code must be at least 6 characters" })
    .max(10, { message: "Verification code cannot exceed 10 characters" }),
});

// Define API response type inline
interface ApiResponse {
  success: boolean;
  message: string;
}

const VerifyAccount = () => {
  const router = useRouter();
  const params = useParams<{ username: string }>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    setIsSubmitting(true);
    try {
      // Make sure the username is correctly extracted from params
      if (!params.username) {
        toast.error("Error", {
          description: "Username is missing",
        });
        return;
      }

      const response = await axios.post<ApiResponse>(`/api/verify-code`, {
        username: params.username,
        code: data.code,
      });

      if (response.data.success) {
        toast.success("Success", {
          description: response.data.message,
        });
        router.replace("/sign-in");
      } else {
        // This shouldn't happen with proper API design, but just in case
        toast.error("Verification failed", {
          description: response.data.message || "Unknown error occurred",
        });
      }
    } catch (error) {
      console.error("Error verifying account:", error);
      const axiosError = error as AxiosError<ApiResponse>;
      
      // Get the error message from the response or use a default
      const errorMessage = axiosError.response?.data.message || 
                         "Failed to connect to the server. Please try again.";
      
      toast.error("Verification failed", {
        description: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Verify Your Account
          </h1>
          <p className="mb-4">
            Enter the verification code sent to your email.
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="code"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verification Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your verification code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Verifying..." : "Verify Account"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default VerifyAccount;
