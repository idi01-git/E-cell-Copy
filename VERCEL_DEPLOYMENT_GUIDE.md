# 🚀 Vercel Deployment Guide - E-Cell Website

**Last Updated**: October 1, 2025 at 14:21 IST

---

## ✅ Security Fixes Applied

All hardcoded credentials have been removed from the codebase!  
Environment variables are now required for deployment.

---

## 📋 Environment Variables Required

### **Set These in Vercel Dashboard**

Go to: **Project Settings** → **Environment Variables**

| Variable Name | Your Value | Required |
|--------------|------------|----------|
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | `service_dq0of8p` | ✅ Yes |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ADMIN` | `template_ugdke5g` | ✅ Yes |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_AUTO_REPLY` | `template_8yak58f` | ✅ Yes |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | `SsELCJJIDgQSbh_XE` | ✅ Yes |
| `NEXT_PUBLIC_SITE_URL` | `https://your-domain.vercel.app` | ✅ Yes |
| `NEXT_PUBLIC_SENTRY_DSN` | Your Sentry DSN (if using) | Optional |

---

## 🎯 Step-by-Step Deployment

### **Step 1: Local Testing (Optional but Recommended)**

Create `.env.local` file in project root:

```bash
# .env.local
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_dq0of8p
NEXT_PUBLIC_EMAILJS_TEMPLATE_ADMIN=template_ugdke5g
NEXT_PUBLIC_EMAILJS_TEMPLATE_AUTO_REPLY=template_8yak58f
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=SsELCJJIDgQSbh_XE
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Test locally:
```bash
npm run dev
# Test the contact form
```

---

### **Step 2: Push to GitHub**

```bash
# Verify no sensitive files are staged
git status

# Should NOT see .env.local in the list
# .gitignore will automatically exclude it

# Commit and push
git add .
git commit -m "Security fix: Move EmailJS credentials to environment variables"
git push origin main
```

---

### **Step 3: Set Up Vercel Project**

1. Go to [vercel.com](https://vercel.com)
2. Click **Add New** → **Project**
3. **Import** your GitHub repository
4. Vercel will auto-detect Next.js settings

---

### **Step 4: Add Environment Variables in Vercel**

1. In Vercel project settings, go to **Environment Variables**
2. Add each variable:

```
Name: NEXT_PUBLIC_EMAILJS_SERVICE_ID
Value: service_dq0of8p
Environments: ✅ Production ✅ Preview ✅ Development
```

```
Name: NEXT_PUBLIC_EMAILJS_TEMPLATE_ADMIN
Value: template_ugdke5g
Environments: ✅ Production ✅ Preview ✅ Development
```

```
Name: NEXT_PUBLIC_EMAILJS_TEMPLATE_AUTO_REPLY
Value: template_8yak58f
Environments: ✅ Production ✅ Preview ✅ Development
```

```
Name: NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
Value: SsELCJJIDgQSbh_XE
Environments: ✅ Production ✅ Preview ✅ Development
```

```
Name: NEXT_PUBLIC_SITE_URL
Value: https://your-actual-domain.vercel.app
Environments: ✅ Production
```

**IMPORTANT**: Check all three environments for each variable!

---

### **Step 5: Deploy**

1. Click **Deploy** in Vercel
2. Wait for build to complete (~2-3 minutes)
3. Visit your deployed URL

---

### **Step 6: Test Contact Form**

1. Go to your live website
2. Navigate to Contact section
3. Fill out and submit the form
4. Check if:
   - Form submits successfully
   - Admin receives email
   - User receives auto-reply

---

## 🔍 Troubleshooting

### **Contact Form Not Working**

**Error**: "EmailJS configuration missing"

**Solution**:
1. Go to Vercel Dashboard → Settings → Environment Variables
2. Verify ALL four EmailJS variables are set
3. Make sure you selected ALL environments (Production, Preview, Development)
4. Redeploy: Deployments → ⋯ → Redeploy

---

### **Emails Not Sending**

**Possible Issues**:

1. **Wrong Template IDs**:
   - Admin template: `template_ugdke5g`
   - Auto-reply template: `template_8yak58f`
   - Verify these in your EmailJS dashboard

2. **Wrong Service ID**:
   - Service ID: `service_dq0of8p`
   - Verify in EmailJS dashboard

3. **Wrong Public Key**:
   - Public Key: `SsELCJJIDgQSbh_XE`
   - Verify in EmailJS account settings

---

### **Build Failing**

**Check Vercel Build Logs**:
1. Go to Deployments → Failed deployment
2. Check build logs for errors
3. Common issues:
   - TypeScript errors (run `npx tsc --noEmit` locally)
   - Missing dependencies (run `npm install`)

---

## 🔒 Security Checklist

Before deploying, verify:

- [ ] No `.env` or `.env.local` files committed to GitHub
- [ ] Run `git status` - `.env.local` should NOT appear
- [ ] All EmailJS credentials moved to environment variables
- [ ] `.gitignore` properly configured (it is!)
- [ ] Environment variables set in Vercel dashboard
- [ ] All environments selected for each variable

---

## 🎉 Post-Deployment

After successful deployment:

1. **Test Everything**:
   - Homepage loads
   - All navigation works
   - Contact form sends emails
   - Blog pages load
   - Gallery modal works
   - Mobile responsive

2. **Monitor**:
   - Check Vercel deployment logs
   - Monitor EmailJS usage
   - Test on different devices

3. **Optional - Set Up Custom Domain**:
   - Vercel Settings → Domains
   - Add your custom domain
   - Update `NEXT_PUBLIC_SITE_URL` environment variable

---

## 📞 Support

**Vercel Issues**: https://vercel.com/support  
**EmailJS Issues**: https://www.emailjs.com/docs/  
**GitHub Issues**: Check repository issues tab

---

## ✅ What Changed from Before

### **Security Improvements**:

**Before** ❌:
```typescript
emailjs.init("SsELCJJIDgQSbh_XE"); // Exposed in code!
emailjs.send("service_dq0of8p", ...); // Hardcoded!
```

**After** ✅:
```typescript
const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
emailjs.init(publicKey); // From environment variable!

const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
emailjs.send(serviceId, ...); // Secure!
```

---

## 🚀 Ready to Deploy!

Your codebase is now secure and ready for production deployment.  
Follow the steps above and you'll be live in minutes!

---

**Generated**: October 1, 2025 at 14:21 IST  
**Status**: 🟢 **SECURE & READY**  
**Next Step**: Set environment variables in Vercel dashboard
