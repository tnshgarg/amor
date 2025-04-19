
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Image, Upload, X } from 'lucide-react';

interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void;
  existingImage?: string;
}

const ImageUpload = ({ onImageUpload, existingImage }: ImageUploadProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(existingImage || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (!file) return;
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPEG, PNG, etc.)",
        variant: "destructive"
      });
      return;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 5MB",
        variant: "destructive"
      });
      return;
    }
    
    // Create a preview URL and pass it to the parent component
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    onImageUpload(url);
  };
  
  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleRemoveImage = () => {
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onImageUpload('');
  };

  return (
    <Card className="border-love-200 dark:border-love-800">
      <CardContent className="p-4">
        <div className="flex flex-col items-center">
          {previewUrl ? (
            <div className="relative w-full">
              <div className="aspect-square relative overflow-hidden rounded-lg mb-4">
                <img 
                  src={previewUrl} 
                  alt="Uploaded cover" 
                  className="w-full h-full object-cover"
                />
              </div>
              <Button 
                type="button" 
                variant="outline" 
                size="icon"
                className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-background/90"
                onClick={handleRemoveImage}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div 
              className="w-full aspect-square flex flex-col items-center justify-center bg-muted/30 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors mb-4"
              onClick={handleUploadClick}
            >
              <Image className="h-10 w-10 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">Upload cover image</p>
              <p className="text-xs text-muted-foreground/70 mt-1">Recommended: Square image</p>
            </div>
          )}
          
          <input 
            ref={fileInputRef}
            type="file" 
            accept="image/*" 
            onChange={handleFileChange} 
            className="hidden"
          />
          
          <Button 
            type="button" 
            variant="outline" 
            className="w-full border-love-300 hover:border-love-500 hover:text-love-500"
            onClick={handleUploadClick}
          >
            <Upload className="mr-2 h-4 w-4" />
            {previewUrl ? 'Change Image' : 'Upload Image'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageUpload;
