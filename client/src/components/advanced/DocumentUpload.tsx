import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { X, Upload, FileText, Download, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadProgress: number;
  uploaded: boolean;
  category: 'resume' | 'transcript' | 'cover-letter' | 'portfolio' | 'other';
}

interface DocumentUploadProps {
  onFilesUploaded?: (files: UploadedFile[]) => void;
  acceptedTypes?: string[];
  maxFileSize?: number;
}

export function DocumentUpload({ 
  onFilesUploaded, 
  acceptedTypes = ['.pdf', '.doc', '.docx', '.txt'],
  maxFileSize = 10 * 1024 * 1024 // 10MB
}: DocumentUploadProps) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles: UploadedFile[] = acceptedFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      uploadProgress: 0,
      uploaded: false,
      category: getFileCategory(file.name),
    }));

    setFiles(prev => [...prev, ...newFiles]);

    // Simulate upload progress
    newFiles.forEach(file => {
      simulateUpload(file.id);
    });
  }, []);

  const getFileCategory = (fileName: string): UploadedFile['category'] => {
    const name = fileName.toLowerCase();
    if (name.includes('resume') || name.includes('cv')) return 'resume';
    if (name.includes('transcript')) return 'transcript';
    if (name.includes('cover')) return 'cover-letter';
    if (name.includes('portfolio')) return 'portfolio';
    return 'other';
  };

  const simulateUpload = (fileId: string) => {
    setUploading(true);
    const interval = setInterval(() => {
      setFiles(prev => prev.map(file => {
        if (file.id === fileId) {
          const newProgress = Math.min(file.uploadProgress + Math.random() * 30, 100);
          if (newProgress >= 100) {
            clearInterval(interval);
            setUploading(false);
            toast({
              title: "Upload Complete",
              description: `${file.name} has been uploaded successfully.`,
            });
            return { ...file, uploadProgress: 100, uploaded: true };
          }
          return { ...file, uploadProgress: newProgress };
        }
        return file;
      }));
    }, 200);
  };

  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getCategoryColor = (category: UploadedFile['category']) => {
    const colors = {
      'resume': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'transcript': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'cover-letter': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      'portfolio': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      'other': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
    };
    return colors[category];
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt'],
    },
    maxSize: maxFileSize,
  });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Document Upload
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
            isDragActive 
              ? 'border-primary bg-primary/5' 
              : 'border-border hover:border-primary/50 hover:bg-accent/50'
          }`}
        >
          <input {...getInputProps()} />
          <Upload className={`h-12 w-12 mx-auto mb-4 ${isDragActive ? 'text-primary' : 'text-muted-foreground'}`} />
          <p className="text-lg font-medium text-foreground mb-2">
            {isDragActive ? 'Drop files here' : 'Drag & drop files here'}
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            Supports PDF, DOC, DOCX, TXT files up to {formatFileSize(maxFileSize)}
          </p>
          <Button variant="outline" size="sm">
            Browse Files
          </Button>
        </div>

        <AnimatePresence>
          {files.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-3"
            >
              <h4 className="font-medium text-foreground">Uploaded Files</h4>
              {files.map((file) => (
                <motion.div
                  key={file.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-center justify-between p-3 bg-accent/50 rounded-lg border border-border"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <FileText className="h-8 w-8 text-primary" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-medium text-foreground truncate">
                          {file.name}
                        </p>
                        <Badge className={getCategoryColor(file.category)}>
                          {file.category.replace('-', ' ')}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        {formatFileSize(file.size)}
                      </p>
                      {!file.uploaded && (
                        <div className="w-full">
                          <Progress value={file.uploadProgress} className="h-2" />
                          <p className="text-xs text-muted-foreground mt-1">
                            {Math.round(file.uploadProgress)}% uploaded
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {file.uploaded && (
                      <>
                        <Button variant="ghost" size="sm" data-testid={`button-view-${file.id}`}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" data-testid={`button-download-${file.id}`}>
                          <Download className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removeFile(file.id)}
                      data-testid={`button-remove-${file.id}`}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}