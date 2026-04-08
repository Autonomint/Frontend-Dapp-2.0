# Memory Optimization Guide

## Immediate Actions Taken

### 1. Next.js Configuration Optimized
- Added image optimization (WebP/AVIF formats)
- Enabled SWC minification and compression
- Added package import optimization for heavy libraries
- Configured webpack for better memory management

### 2. Development Memory Limits
- Set Node.js memory limit to 4GB for development
- Created separate turbo pack script for when needed

### 3. Cache Management
- Added Next.js cache directories to .gitignore
- Cleared existing cache files

## Further Recommendations

### Asset Optimization (Critical)
The following large SVG files need immediate attention:
- `home-banner.svg` & `home-banner-dark.svg` (1.3MB each)
- `mobile banner background Image.svg` (1.3MB)
- `dcds-ring-light.svg` & `dcds-ring-dark.svg` (1MB each)
- `Well Dark.svg` & `Well Light Mode.svg` (~950KB each)

**Solutions:**
1. Convert to optimized PNG/WebP format
2. Use SVG optimization tools (SVGO)
3. Implement lazy loading for banner images
4. Consider using CSS gradients instead of large SVG backgrounds

### Code Optimization
1. **Fix useEffect memory leaks** - Many components lack cleanup functions
2. **Chart optimization** - Chart components are re-rendering frequently
3. **Timeout cleanup** - Several setTimeout calls without proper cleanup

### Development Workflow
1. **Use regular dev mode**: `npm run dev` (not turbo pack for daily work)
2. **Clear cache weekly**: `rm -rf .next`
3. **Monitor memory**: Use Activity Monitor to track Node.js processes

## Commands
```bash
# Start development with memory limits
npm run dev

# Start with turbo pack (when needed)
npm run dev:turbo

# Clean cache if memory is high
rm -rf .next
npm run dev
```

## Expected Memory Usage
- **Before**: 7GB+
- **After optimization**: 2-3GB
- **With asset optimization**: 1-2GB
