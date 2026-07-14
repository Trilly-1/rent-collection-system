import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Image, Upload, Eye, Trash2, RotateCcw } from 'lucide-react';
import { classNames } from '../../utils/helpers.js';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

export default function ImageUpload({
  label,
  description,
  accept = 'image/*',
  multiple = true,
  maxFiles = 10,
  value = [],
  onChange,
  type = 'property', // 'property' | 'room'
  className = '',
  required = false,
  error,
}) {
  const [previews, setPreviews] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [errors, setErrors] = useState([]);

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      previews.forEach((p) => URL.revokeObjectURL(p.url));
    };
  }, []);

  const validateFile = useCallback((file) => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return `${file.name}: Unsupported file type. Use JPG, PNG, WebP, or GIF.`;
    }
    if (file.size > MAX_FILE_SIZE) {
      return `${file.name}: File too large. Maximum 5MB.`;
    }
    return null;
  }, []);

  const createPreviews = useCallback((files) => {
    const newPreviews = [];
    const newErrors = [];

    for (const file of files) {
      const error = validateFile(file);
      if (error) {
        newErrors.push(error);
        continue;
      }

      const preview = {
        id: `${file.name}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        file,
        name: file.name,
        size: file.size,
        url: URL.createObjectURL(file),
        type: file.type,
      };
      newPreviews.push(preview);
    }

    if (newErrors.length > 0) {
      setErrors((prev) => [...prev, ...newErrors]);
      // Clear errors after 5 seconds
      setTimeout(() => setErrors((prev) => prev.slice(newErrors.length)), 5000);
    }

    return newPreviews;
  }, [validateFile]);

  const handleFiles = useCallback(
    (files) => {
      const fileArray = Array.from(files);
      const newPreviews = createPreviews(fileArray);
      
      setPreviews((prev) => {
        const combined = [...prev, ...newPreviews].slice(0, maxFiles);
        const fileList = combined.map((p) => p.file);
        onChange?.(fileList);
        return combined;
      });
    },
    [createPreviews, maxFiles, onChange]
  );

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setDragging(false);
      
      if (e.dataTransfer.files.length > 0) {
        handleFiles(e.dataTransfer.files);
      }
    },
    [handleFiles]
  );

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  }, []);

  const handleFileSelect = useCallback(
    (e) => {
      if (e.target.files.length > 0) {
        handleFiles(e.target.files);
        e.target.value = '';
      }
    },
    [handleFiles]
  );

  const removeFile = useCallback(
    (id) => {
      setPreviews((prev) => {
        const removed = prev.find((p) => p.id === id);
        if (removed) URL.revokeObjectURL(removed.url);
        const next = prev.filter((p) => p.id !== id);
        onChange?.(next.map((p) => p.file));
        return next;
      });
    },
    [onChange]
  );

  const clearErrors = useCallback(() => setErrors([]), []);

  const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className={classNames('w-full', className)}>
      {(label || description) && (
        <div className="mb-3">
          {label && (
            <label className="block text-sm font-semibold text-ink-900">
              {label}
              {required && <span className="ml-1 text-clay-500" aria-hidden="true">*</span>}
            </label>
          )}
          {description && (
            <p className="mt-1 text-sm text-ink-700">{description}</p>
          )}
        </div>
      )}

      {/* Drop zone */}
      <motion.div
        className={classNames(
          'relative rounded-2xl border-2 transition-all duration-200',
          'flex flex-col items-center justify-center p-6 text-center',
          dragging
            ? 'border-gold-400 bg-gold-50/50 scale-[1.01] shadow-lg shadow-gold-400/20'
            : 'border-line-300 bg-white hover:border-gold-300 hover:bg-gold-50/30',
          previews.length >= maxFiles && 'opacity-50 pointer-events-none'
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        whileHover={{ scale: previews.length >= maxFiles ? 1 : 1.01 }}
        animate={{ boxShadow: dragging ? '0 20px 40px -15px rgba(230,173,46,0.3)' : undefined }}
      >
        <input
          type="file"
          id={`image-upload-${type}-${Math.random().toString(36).slice(2, 8)}`}
          accept={accept}
          multiple={multiple}
          onChange={handleFileSelect}
          className="sr-only"
          aria-label={`Upload ${type} photos`}
          disabled={previews.length >= maxFiles}
        />
        
        <label
          htmlFor={`image-upload-${type}-${Math.random().toString(36).slice(2, 8)}`}
          className="cursor-pointer w-full"
        >
          <div className="flex flex-col items-center gap-3">
            <div
              className={classNames(
                'flex h-14 w-14 items-center justify-center rounded-xl transition-colors',
                dragging ? 'bg-gold-100 text-gold-600' : 'bg-paper-100 text-ink-500'
              )}
            >
              <Upload className="h-7 w-7" aria-hidden="true" />
            </div>
            
            <div className="text-center">
              <p className="font-medium text-ink-900">
                {dragging ? 'Drop images here' : `Click or drag ${multiple ? 'images' : 'an image'} to upload`}
              </p>
              <p className="mt-1 text-sm text-ink-600">
                {multiple ? `Up to ${maxFiles} files` : 'Single file'} • JPG, PNG, WebP, GIF • Max 5MB each
              </p>
            </div>
          </div>
        </label>

        {/* File input for mobile */}
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={previews.length >= maxFiles}
          aria-hidden="true"
        />
      </motion.div>

      {/* Error messages */}
      <AnimatePresence>
        {errors.map((err, idx) => (
          <motion.div
            key={`${err}-${idx}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-2 flex items-center gap-2 text-sm text-clay-600"
            transition={{ duration: 0.2 }}
          >
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-clay-100">
              <X className="h-3 w-3" />
            </div>
            {err}
          </motion.div>
        ))}
      </AnimatePresence>

      {error && (
        <motion.p
          className="mt-2 text-sm text-clay-600"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {error}
        </motion.p>
      )}

      {/* Previews grid */}
      <AnimatePresence>
        {previews.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium text-ink-900">
                {previews.length} {previews.length === 1 ? 'image' : 'images'} selected
              </p>
              {previews.length < maxFiles && (
                <button
                  type="button"
                  onClick={() => {
                    const input = document.querySelector(`input[type="file"][accept="${accept}"]`);
                    input?.click();
                  }}
                  className="text-sm font-medium text-gold-600 hover:text-gold-700 flex items-center gap-1"
                >
                  <Image className="h-4 w-4" />
                  Add more
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {previews.map((preview) => (
                <motion.div
                  key={preview.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="relative group rounded-xl overflow-hidden border border-line-200 bg-white"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={preview.url}
                      alt={preview.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2 p-2">
                      <button
                        type="button"
                        onClick={() => window.open(preview.url, '_blank')}
                        className="p-2 rounded-lg bg-white/90 text-ink-900 hover:bg-white transition-colors"
                        aria-label={`View ${preview.name} full size`}
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeFile(preview.id)}
                        className="p-2 rounded-lg bg-white/90 text-clay-500 hover:bg-white hover:text-clay-600 transition-colors"
                        aria-label={`Remove ${preview.name}`}
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  <div className="p-2 min-h-[48px]">
                    <p className="text-xs font-medium text-ink-900 truncate" title={preview.name}>
                      {preview.name}
                    </p>
                    <p className="text-[11px] text-ink-500 truncate">{formatSize(preview.size)}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden input for form submission if needed */}
      <input type="hidden" name={`${type}_photos`} />
    </div>
  );
}