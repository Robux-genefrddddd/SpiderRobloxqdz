import { db } from "./firebase";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  Timestamp,
  orderBy,
  limit,
} from "firebase/firestore";

export interface Asset {
  id: string;
  name: string;
  description: string;
  category:
    | "3D Models"
    | "UI Design"
    | "Scripts"
    | "Animations"
    | "Plugins"
    | "Sounds"
    | "Images"
    | "Other";
  price: number;
  imageUrl: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  downloads: number;
  rating: number;
  reviews: number;
  status: "draft" | "published" | "archived";
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  featured?: boolean;
}

const ASSETS_COLLECTION = "assets";

// Get all published assets (for marketplace)
export async function getPublishedAssets(
  categoryFilter?: string,
  limitCount: number = 50,
) {
  try {
    const constraints = [
      where("status", "==", "published"),
      orderBy("updatedAt", "desc"),
      limit(limitCount),
    ];

    if (categoryFilter) {
      constraints.splice(1, 0, where("category", "==", categoryFilter));
    }

    const q = query(collection(db, ASSETS_COLLECTION), ...constraints);
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate?.() || new Date(),
    })) as Asset[];
  } catch (error) {
    console.error("Error fetching published assets:", error);
    return [];
  }
}

// Get user's assets (for dashboard)
export async function getUserAssets(userId: string) {
  try {
    const q = query(
      collection(db, ASSETS_COLLECTION),
      where("authorId", "==", userId),
      orderBy("updatedAt", "desc"),
    );
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate?.() || new Date(),
    })) as Asset[];
  } catch (error) {
    console.error("Error fetching user assets:", error);
    return [];
  }
}

// Get single asset
export async function getAsset(assetId: string) {
  try {
    const docRef = doc(db, ASSETS_COLLECTION, assetId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
        createdAt: docSnap.data().createdAt?.toDate?.() || new Date(),
        updatedAt: docSnap.data().updatedAt?.toDate?.() || new Date(),
      } as Asset;
    }
    return null;
  } catch (error) {
    console.error("Error fetching asset:", error);
    return null;
  }
}

// Create new asset
export async function createAsset(
  authorId: string,
  authorName: string,
  assetData: Omit<
    Asset,
    "id" | "createdAt" | "updatedAt" | "downloads" | "reviews"
  >,
) {
  try {
    const docRef = await addDoc(collection(db, ASSETS_COLLECTION), {
      ...assetData,
      authorId,
      authorName,
      downloads: 0,
      reviews: 0,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });

    return docRef.id;
  } catch (error) {
    console.error("Error creating asset:", error);
    throw error;
  }
}

// Update asset
export async function updateAsset(
  assetId: string,
  updates: Partial<Omit<Asset, "id" | "createdAt">>,
) {
  try {
    const docRef = doc(db, ASSETS_COLLECTION, assetId);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error("Error updating asset:", error);
    throw error;
  }
}

// Delete asset
export async function deleteAsset(assetId: string) {
  try {
    const docRef = doc(db, ASSETS_COLLECTION, assetId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting asset:", error);
    throw error;
  }
}

// Increment download count
export async function incrementAssetDownloads(assetId: string) {
  try {
    const docRef = doc(db, ASSETS_COLLECTION, assetId);
    const asset = await getAsset(assetId);
    if (asset) {
      await updateDoc(docRef, {
        downloads: asset.downloads + 1,
      });
    }
  } catch (error) {
    console.error("Error incrementing downloads:", error);
  }
}

// Get featured assets
export async function getFeaturedAssets(limitCount: number = 6) {
  try {
    const q = query(
      collection(db, ASSETS_COLLECTION),
      where("status", "==", "published"),
      where("featured", "==", true),
      orderBy("downloads", "desc"),
      limit(limitCount),
    );
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate?.() || new Date(),
    })) as Asset[];
  } catch (error) {
    console.error("Error fetching featured assets:", error);
    return [];
  }
}
