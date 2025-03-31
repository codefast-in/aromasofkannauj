
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { CLOUDINARY_CONFIG } from '@/config/constants';

const AdminSettings = () => {
  const [generalSettings, setGeneralSettings] = useState({
    storeName: 'Raahi Parfums',
    storeEmail: 'contact@raahiparfums.com',
    storePhone: '+91 9876543210',
    storeAddress: '123 Main Street, New Delhi - 110001',
    storeCurrency: 'INR',
    taxRate: '18',
    enableInventoryManagement: true,
    showOutOfStockProducts: true
  });
  
  const [shippingSettings, setShippingSettings] = useState({
    freeShippingThreshold: '999',
    standardShippingRate: '99',
    expressShippingRate: '199',
    internationalShippingRate: '1499',
    shippingOrigin: 'New Delhi, India'
  });
  
  const [paymentSettings, setPaymentSettings] = useState({
    enableCashOnDelivery: true,
    enableCreditCards: true,
    enableUPI: true,
    enablePayPal: false,
    minimumOrderAmount: '299'
  });
  
  const [emailSettings, setEmailSettings] = useState({
    emailProvider: 'SMTP',
    smtpHost: 'smtp.gmail.com',
    smtpPort: '587',
    smtpUsername: 'noreply@raahiparfums.com',
    smtpPassword: '••••••••••',
    senderName: 'Raahi Parfums',
    senderEmail: 'noreply@raahiparfums.com',
    enableOrderConfirmation: true,
    enableShippingNotification: true,
    enableMarketingEmails: true
  });
  
  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setGeneralSettings(prev => ({ ...prev, [name]: value }));
  };
  
  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setShippingSettings(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPaymentSettings(prev => ({ ...prev, [name]: value }));
  };
  
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEmailSettings(prev => ({ ...prev, [name]: value }));
  };
  
  const handleToggle = (settingType: string, name: string, checked: boolean) => {
    switch (settingType) {
      case 'general':
        setGeneralSettings(prev => ({ ...prev, [name]: checked }));
        break;
      case 'payment':
        setPaymentSettings(prev => ({ ...prev, [name]: checked }));
        break;
      case 'email':
        setEmailSettings(prev => ({ ...prev, [name]: checked }));
        break;
    }
  };
  
  const handleSaveSettings = (type: string) => {
    // In a real app, this would save to the backend
    alert(`${type} settings saved successfully!`);
  };
  
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-serif font-bold">Settings</h1>
        </div>
        
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
            <TabsTrigger value="payment">Payment</TabsTrigger>
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList>
          
          {/* General Settings */}
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Basic store configuration</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="storeName">Store Name</Label>
                      <Input 
                        id="storeName" 
                        name="storeName"
                        value={generalSettings.storeName}
                        onChange={handleGeneralChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="storeEmail">Store Email</Label>
                      <Input 
                        id="storeEmail" 
                        name="storeEmail"
                        type="email"
                        value={generalSettings.storeEmail}
                        onChange={handleGeneralChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="storePhone">Store Phone</Label>
                      <Input 
                        id="storePhone" 
                        name="storePhone"
                        value={generalSettings.storePhone}
                        onChange={handleGeneralChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="storeCurrency">Currency</Label>
                      <Input 
                        id="storeCurrency" 
                        name="storeCurrency"
                        value={generalSettings.storeCurrency}
                        onChange={handleGeneralChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="taxRate">Tax Rate (%)</Label>
                      <Input 
                        id="taxRate" 
                        name="taxRate"
                        type="number"
                        value={generalSettings.taxRate}
                        onChange={handleGeneralChange}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="storeAddress">Store Address</Label>
                    <Textarea 
                      id="storeAddress" 
                      name="storeAddress"
                      rows={3}
                      value={generalSettings.storeAddress}
                      onChange={handleGeneralChange}
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="enableInventoryManagement">Inventory Management</Label>
                        <p className="text-sm text-muted-foreground">
                          Track product stock and prevent overselling
                        </p>
                      </div>
                      <Switch 
                        id="enableInventoryManagement"
                        checked={generalSettings.enableInventoryManagement}
                        onCheckedChange={(checked) => 
                          handleToggle('general', 'enableInventoryManagement', checked)
                        }
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="showOutOfStockProducts">Show Out of Stock Products</Label>
                        <p className="text-sm text-muted-foreground">
                          Display products that are currently out of stock
                        </p>
                      </div>
                      <Switch 
                        id="showOutOfStockProducts"
                        checked={generalSettings.showOutOfStockProducts}
                        onCheckedChange={(checked) => 
                          handleToggle('general', 'showOutOfStockProducts', checked)
                        }
                      />
                    </div>
                  </div>
                  
                  <Button 
                    type="button" 
                    onClick={() => handleSaveSettings('General')}
                  >
                    Save Settings
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Shipping Settings */}
          <TabsContent value="shipping">
            <Card>
              <CardHeader>
                <CardTitle>Shipping Settings</CardTitle>
                <CardDescription>Configure shipping options and rates</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="freeShippingThreshold">Free Shipping Threshold (₹)</Label>
                      <Input 
                        id="freeShippingThreshold" 
                        name="freeShippingThreshold"
                        type="number"
                        value={shippingSettings.freeShippingThreshold}
                        onChange={handleShippingChange}
                      />
                      <p className="text-sm text-muted-foreground">
                        Order amount above which shipping is free
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="standardShippingRate">Standard Shipping Rate (₹)</Label>
                      <Input 
                        id="standardShippingRate" 
                        name="standardShippingRate"
                        type="number"
                        value={shippingSettings.standardShippingRate}
                        onChange={handleShippingChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="expressShippingRate">Express Shipping Rate (₹)</Label>
                      <Input 
                        id="expressShippingRate" 
                        name="expressShippingRate"
                        type="number"
                        value={shippingSettings.expressShippingRate}
                        onChange={handleShippingChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="internationalShippingRate">International Shipping Rate (₹)</Label>
                      <Input 
                        id="internationalShippingRate" 
                        name="internationalShippingRate"
                        type="number"
                        value={shippingSettings.internationalShippingRate}
                        onChange={handleShippingChange}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="shippingOrigin">Shipping Origin</Label>
                    <Input 
                      id="shippingOrigin" 
                      name="shippingOrigin"
                      value={shippingSettings.shippingOrigin}
                      onChange={handleShippingChange}
                    />
                    <p className="text-sm text-muted-foreground">
                      Location from where products are shipped
                    </p>
                  </div>
                  
                  <Button 
                    type="button" 
                    onClick={() => handleSaveSettings('Shipping')}
                  >
                    Save Settings
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Payment Settings */}
          <TabsContent value="payment">
            <Card>
              <CardHeader>
                <CardTitle>Payment Settings</CardTitle>
                <CardDescription>Configure payment methods and options</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="enableCashOnDelivery">Cash On Delivery</Label>
                        <p className="text-sm text-muted-foreground">
                          Allow customers to pay on delivery
                        </p>
                      </div>
                      <Switch 
                        id="enableCashOnDelivery"
                        checked={paymentSettings.enableCashOnDelivery}
                        onCheckedChange={(checked) => 
                          handleToggle('payment', 'enableCashOnDelivery', checked)
                        }
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="enableCreditCards">Credit/Debit Cards</Label>
                        <p className="text-sm text-muted-foreground">
                          Accept payment via credit and debit cards
                        </p>
                      </div>
                      <Switch 
                        id="enableCreditCards"
                        checked={paymentSettings.enableCreditCards}
                        onCheckedChange={(checked) => 
                          handleToggle('payment', 'enableCreditCards', checked)
                        }
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="enableUPI">UPI</Label>
                        <p className="text-sm text-muted-foreground">
                          Accept payment via UPI
                        </p>
                      </div>
                      <Switch 
                        id="enableUPI"
                        checked={paymentSettings.enableUPI}
                        onCheckedChange={(checked) => 
                          handleToggle('payment', 'enableUPI', checked)
                        }
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="enablePayPal">PayPal</Label>
                        <p className="text-sm text-muted-foreground">
                          Accept payment via PayPal
                        </p>
                      </div>
                      <Switch 
                        id="enablePayPal"
                        checked={paymentSettings.enablePayPal}
                        onCheckedChange={(checked) => 
                          handleToggle('payment', 'enablePayPal', checked)
                        }
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="minimumOrderAmount">Minimum Order Amount (₹)</Label>
                    <Input 
                      id="minimumOrderAmount" 
                      name="minimumOrderAmount"
                      type="number"
                      value={paymentSettings.minimumOrderAmount}
                      onChange={handlePaymentChange}
                    />
                    <p className="text-sm text-muted-foreground">
                      Minimum amount required to place an order
                    </p>
                  </div>
                  
                  <Button 
                    type="button" 
                    onClick={() => handleSaveSettings('Payment')}
                  >
                    Save Settings
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Email Settings */}
          <TabsContent value="email">
            <Card>
              <CardHeader>
                <CardTitle>Email Settings</CardTitle>
                <CardDescription>Configure email notifications and templates</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="emailProvider">Email Provider</Label>
                      <Input 
                        id="emailProvider" 
                        name="emailProvider"
                        value={emailSettings.emailProvider}
                        onChange={handleEmailChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="smtpHost">SMTP Host</Label>
                      <Input 
                        id="smtpHost" 
                        name="smtpHost"
                        value={emailSettings.smtpHost}
                        onChange={handleEmailChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="smtpPort">SMTP Port</Label>
                      <Input 
                        id="smtpPort" 
                        name="smtpPort"
                        value={emailSettings.smtpPort}
                        onChange={handleEmailChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="smtpUsername">SMTP Username</Label>
                      <Input 
                        id="smtpUsername" 
                        name="smtpUsername"
                        value={emailSettings.smtpUsername}
                        onChange={handleEmailChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="smtpPassword">SMTP Password</Label>
                      <Input 
                        id="smtpPassword" 
                        name="smtpPassword"
                        type="password"
                        value={emailSettings.smtpPassword}
                        onChange={handleEmailChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="senderName">Sender Name</Label>
                      <Input 
                        id="senderName" 
                        name="senderName"
                        value={emailSettings.senderName}
                        onChange={handleEmailChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="senderEmail">Sender Email</Label>
                      <Input 
                        id="senderEmail" 
                        name="senderEmail"
                        type="email"
                        value={emailSettings.senderEmail}
                        onChange={handleEmailChange}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="enableOrderConfirmation">Order Confirmation Emails</Label>
                        <p className="text-sm text-muted-foreground">
                          Send email when an order is placed
                        </p>
                      </div>
                      <Switch 
                        id="enableOrderConfirmation"
                        checked={emailSettings.enableOrderConfirmation}
                        onCheckedChange={(checked) => 
                          handleToggle('email', 'enableOrderConfirmation', checked)
                        }
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="enableShippingNotification">Shipping Notification Emails</Label>
                        <p className="text-sm text-muted-foreground">
                          Send email when an order is shipped
                        </p>
                      </div>
                      <Switch 
                        id="enableShippingNotification"
                        checked={emailSettings.enableShippingNotification}
                        onCheckedChange={(checked) => 
                          handleToggle('email', 'enableShippingNotification', checked)
                        }
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="enableMarketingEmails">Marketing Emails</Label>
                        <p className="text-sm text-muted-foreground">
                          Send promotional emails to customers
                        </p>
                      </div>
                      <Switch 
                        id="enableMarketingEmails"
                        checked={emailSettings.enableMarketingEmails}
                        onCheckedChange={(checked) => 
                          handleToggle('email', 'enableMarketingEmails', checked)
                        }
                      />
                    </div>
                  </div>
                  
                  <Button 
                    type="button" 
                    onClick={() => handleSaveSettings('Email')}
                  >
                    Save Settings
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Integrations */}
          <TabsContent value="integrations">
            <Card>
              <CardHeader>
                <CardTitle>Integrations</CardTitle>
                <CardDescription>Configure third-party services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Cloudinary Integration */}
                  <div className="border rounded-md p-4">
                    <h3 className="text-lg font-medium mb-2">Cloudinary</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Image storage and optimization
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <Label>Cloud Name</Label>
                        <Input value={CLOUDINARY_CONFIG.cloud_name} readOnly />
                      </div>
                      <div className="space-y-2">
                        <Label>API Key</Label>
                        <Input value={CLOUDINARY_CONFIG.api_key} readOnly />
                      </div>
                      <div className="space-y-2">
                        <Label>Folder Name</Label>
                        <Input value={CLOUDINARY_CONFIG.folder_name} readOnly />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        Connected
                      </span>
                      <Button variant="outline" size="sm">
                        Update Settings
                      </Button>
                    </div>
                  </div>
                  
                  {/* MongoDB Integration */}
                  <div className="border rounded-md p-4">
                    <h3 className="text-lg font-medium mb-2">MongoDB</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Database for product and order data
                    </p>
                    
                    <div className="space-y-2 mb-4">
                      <Label>Connection URL</Label>
                      <Input 
                        value={`mongodb+srv://****:****@cluster0.3doac7y.mongodb.net/Career-Brij`} 
                        readOnly 
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        Connected
                      </span>
                      <Button variant="outline" size="sm">
                        Update Settings
                      </Button>
                    </div>
                  </div>
                  
                  {/* Payment Gateway Integration */}
                  <div className="border rounded-md p-4">
                    <h3 className="text-lg font-medium mb-2">Payment Gateway</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Process online payments
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                        Setup Required
                      </span>
                      <Button>
                        Connect Gateway
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
