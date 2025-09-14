# Notion Integration Setup for Barbuda Rising

## 🔧 Step-by-Step Setup Guide

### 1. Create Notion Integration

1. Go to [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations)
2. Click **"New Integration"**
3. Fill in the details:
   - **Name**: `Barbuda Rising Vision Collector`
   - **Logo**: Upload a logo if you have one
   - **Associated workspace**: Select your workspace
4. **Copy the "Internal Integration Token"** (starts with `secret_`)
   - ⚠️ Keep this secret! Don't share it publicly.

### 2. Create Notion Database

1. **Create a new page** in your Notion workspace
2. **Add a database** (Table view)
3. **Name it**: `Barbuda Rising - Community Visions`
4. **Create these columns exactly** (case-sensitive):

| Column Name | Type | Description |
|-------------|------|-------------|
| **Title** | Title | Auto-generated title |
| **Email** | Email | Contributor's email |
| **Vision** | Text (Long text) | Full vision text |
| **Seed Card** | Text | Card from Seed Zone |
| **Nurture Card** | Text | Card from Nurture Zone |
| **Optimize Card** | Text | Card from Optimize Zone |
| **Visualize Card** | Text | Card from Visualize Zone |
| **Timestamp** | Date & Time | When submitted |
| **IP Address** | Text | For analytics |
| **Status** | Select | New, Reviewed, Contacted |

5. **For the Status column**, add these options:
   - `New` (default)
   - `Reviewed` 
   - `Contacted`
   - `Implemented`

### 3. Share Database with Integration

1. **In your database, click "Share"** (top right)
2. **Click "Add people, emails, groups, or integrations"**
3. **Search for and select** your integration: `Barbuda Rising Vision Collector`
4. **Make sure it has "Full access"**
5. **Copy the Database ID** from the URL:
   - URL looks like: `https://notion.so/your-workspace/DATABASE_ID?v=...`
   - Database ID is the 32-character string (like: `12345678901234567890123456789012`)

### 4. Configure Vercel Environment Variables

1. **Go to your Vercel Dashboard**
2. **Select your project** (`nova-game`)
3. **Go to Settings → Environment Variables**
4. **Add these two variables**:

   **Variable 1:**
   - **Name**: `NOTION_TOKEN`
   - **Value**: `secret_xxxxx` (your integration token)
   - **Environments**: Production, Preview, Development

   **Variable 2:**
   - **Name**: `NOTION_DATABASE_ID`
   - **Value**: `12345678901234567890123456789012` (your database ID)
   - **Environments**: Production, Preview, Development

5. **Redeploy your project** for environment variables to take effect

### 5. Test the Integration

1. **Visit your deployed site**
2. **Go to the `/debug` page**
3. **Test the "Vision Save" functionality**
4. **Check your Notion database** - you should see new entries!

## 📊 What You'll See in Notion

Once set up, every vision submission will create a new row in your Notion database with:

- **Organized data**: All vision details in structured columns
- **Easy filtering**: Filter by status, date, email domain
- **Rich formatting**: Full vision text with proper formatting
- **Action tracking**: Mark as reviewed, contacted, implemented
- **Export capability**: Export data for analysis or reports

## 🔍 Troubleshooting

### Common Issues:

**❌ "Database connection error"**
- Check that `NOTION_TOKEN` is correct and starts with `secret_`
- Verify the integration has access to your workspace

**❌ "Database not found"**
- Check that `NOTION_DATABASE_ID` is the correct 32-character ID
- Make sure you shared the database with your integration

**❌ "Missing properties"**
- Ensure all column names match exactly (case-sensitive)
- Check that column types are correct (Email, Text, Date & Time, Select)

### Testing Commands:

```bash
# Test locally (if you have the repo cloned):
node -e "console.log(process.env.NOTION_TOKEN ? 'Token found' : 'Token missing')"
```

## 🎉 Success!

Once configured, you'll have:
- ✅ **Automatic vision collection** in Notion
- ✅ **Organized community feedback** 
- ✅ **Easy review and follow-up** process
- ✅ **Data export** capabilities for analysis

Your community visions will now be systematically collected and organized for Barbuda's development planning! 🇦🇬 ✨