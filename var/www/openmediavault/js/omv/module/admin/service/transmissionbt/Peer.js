/**
 * Copyright (C) 2011-2012 Marcel Beck <marcel.beck@mbeck.org>
 * Copyright (C) 2013-2016 OpenMediaVault Plugin Developers
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

// require("js/omv/WorkspaceManager.js")
// require("js/omv/workspace/form/Panel.js")

Ext.define('OMV.module.admin.service.transmissionbt.Peer', {
    extend: 'OMV.workspace.form.Panel',

    rpcService: 'TransmissionBt',
    rpcGetMethod: 'getPeerSettings',
    rpcSetMethod: 'setPeerSettings',

    getFormItems: function() {
        return [{
            xtype: 'fieldset',
            title: _('Peers'),
            defaults: {
                labelSeparator: ''
            },
            items: [{
                xtype: 'fieldset',
                title: _('Bindings'),
                defaults: {
                    labelSeparator: ''
                },
                items: [{
                    xtype: 'textfield',
                    name: 'bind-address-ipv4',
                    fieldLabel: _('IPv4'),
                    vtype: 'IPv4Net',
                    allowBlank: false,
                    value: '0.0.0.0',
                    plugins: [{
                        ptype: 'fieldinfo',
                        text: _('IPv4 address to listen on. Use 0.0.0.0 for all host IPs.')
                    }]
                }, {
                    xtype: 'textfield',
                    name: 'bind-address-ipv6',
                    fieldLabel: _('IPv6'),
                    vtype: 'IPv6',
                    allowBlank: false,
                    value: '::',
                    plugins: [{
                        ptype: 'fieldinfo',
                        text: _('IPv6 address to listen on. Use :: for all host IPs.')
                    }]
                }]
            }, {
                xtype: 'fieldset',
                title: _('Limits'),
                defaults: {
                    labelSeparator: ''
                },
                items: [{
                    xtype: 'numberfield',
                    name: 'peer-limit-global',
                    fieldLabel: _('Global'),
                    allowDecimals: false,
                    allowNegative: false,
                    allowBlank: false,
                    value: 240
                }, {
                    xtype: 'numberfield',
                    name: 'peer-limit-per-torrent',
                    fieldLabel: _('Per torrent'),
                    allowDecimals: false,
                    allowNegative: false,
                    allowBlank: false,
                    value: 60
                }, {
                    xtype: 'combo',
                    name: 'peer-socket-tos',
                    fieldLabel: _('Socket TOS'),
                    queryMode: 'local',
                    store: Ext.create('Ext.data.SimpleStore', {
                        fields: [
                            'value',
                            'text'
                        ],
                        data: [
                            ['default', _('default')],
                            ['lowcost', _('lowcost')],
                            ['throughput', _('throughput')],
                            ['lowdelay', _('lowdelay')],
                            ['reliability', _('reliability')]
                        ]
                    }),
                    displayField: 'text',
                    valueField: 'value',
                    allowBlank: false,
                    editable: false,
                    triggerAction: 'all',
                    value: 'default'
                }]
            }]
        }, {
            xtype: 'fieldset',
            title: _('Peer Ports'),
            defaults: {
                labelSeparator: ''
            },
            items: [{
                xtype: 'numberfield',
                name: 'peer-port',
                fieldLabel: _('Peer port'),
                vtype: 'port',
                minValue: 1024,
                maxValue: 65535,
                allowDecimals: false,
                allowNegative: false,
                allowBlank: false,
                value: 51413,
                plugins: [{
                    ptype: 'fieldinfo',
                    text: _('Port to listen for incoming peer connections.')
                }]
            }, {
                xtype: 'numberfield',
                name: 'peer-port-random-low',
                fieldLabel: _('Random low'),
                vtype: 'port',
                minValue: 1024,
                maxValue: 65535,
                allowDecimals: false,
                allowNegative: false,
                allowBlank: false,
                value: 1024
            }, {
                xtype: 'numberfield',
                name: 'peer-port-random-high',
                fieldLabel: _('Random high'),
                vtype: 'port',
                minValue: 1024,
                maxValue: 65535,
                allowDecimals: false,
                allowNegative: false,
                allowBlank: false,
                value: 65535
            }, {
                xtype: 'checkbox',
                name: 'peer-port-random-on-start',
                fieldLabel: _('Random port'),
                boxLabel: _('Random port on start.'),
                checked: false
            }, {
                xtype: 'checkbox',
                name: 'port-forwarding-enabled',
                fieldLabel: _('Port forwarding'),
                checked: true,
                boxLabel: _('Enable port forwarding via NAT-PMP or UPnP.')
            }]
        }];
    }
});

OMV.WorkspaceManager.registerPanel({
    id: 'peer',
    path: '/service/transmissionbt',
    text: _('Peer'),
    position: 50,
    className: 'OMV.module.admin.service.transmissionbt.Peer'
});
