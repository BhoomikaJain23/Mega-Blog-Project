import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        try {
            if (post) {
                const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

                if (file) {
                    appwriteService.deleteFile(post.featuredimage);
                }

                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featuredimage: file ? file.$id : post.featuredimage,
                });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            } else {
                if (!data.image[0]) {
                    alert("Please select a featured image");
                    return;
                }

                const file = await appwriteService.uploadFile(data.image[0]);
                console.log("Uploaded file:", file);
                console.log("File type:", typeof file, "File $id:", file?.$id);

                if (file && file.$id) {
                    console.log("About to create post with featuredImage:", file.$id);
                    console.log("appwriteService exists?", !!appwriteService);
                    console.log("appwriteService.createPost exists?", typeof appwriteService.createPost);
                    
                    console.log("Calling createPost...");
                    let dbPost;
                    try {
                        dbPost = await appwriteService.createPost({
                            title: data.title,
                            slug: data.slug,
                            content: data.content,
                            status: data.status,
                            featuredimage: file.$id,
                            userId: userData.$id,
                        });
                    } catch (createErr) {
                        console.error("createPost threw error:", createErr);
                        throw createErr;
                    }
                    console.log("dbPost returned:", dbPost);
                    console.log("dbPost type:", typeof dbPost);
                    console.log("dbPost keys:", dbPost ? Object.keys(dbPost) : "null/undefined");

                    if (dbPost && dbPost.$id) {
                        navigate(`/post/${dbPost.$id}`);
                    } else {
                        console.error("dbPost is invalid:", dbPost);
                        throw new Error("Post creation returned undefined or invalid response");
                    }
                } else {
                    alert("Failed to upload image. Please try again.");
                }
            }
        } catch (error) {
            console.error("Submit error:", error.message);
            alert("Error: " + error.message);
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredimage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}