/**
 * Copyright (C) 2009-2012 Volker Theile <volker.theile@openmediavault.org>
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

Ext.define('OMV.module.admin.service.transmissionbt.Settings', {
    extend: 'OMV.workspace.form.Panel',

    rpcService: 'TransmissionBt',
    rpcGetMethod: 'getSettings',
    rpcSetMethod: 'setSettings',

    getFormItems: function() {
        return [{
            xtype: 'fieldset',
            title: _('General'),
            defaults: {
                labelSeparator: ''
            },
            items: [{
                xtype: 'checkbox',
                name: 'enable',
                fieldLabel: _('Enable'),
                checked: false
            }]
        }, {
            xtype: 'fieldset',
            title: _('Misc'),
            defaults: {
                labelSeparator: ''
            },
            items: [{
                xtype: 'numberfield',
                name: 'cache-size-mb',
                fieldLabel: _('Cache size'),
                allowDecimals: false,
                allowNegative: false,
                allowBlank: false,
                value: 4,
                plugins: [{
                    ptype: 'fieldinfo',
                    text: _('Cache size (in MB) to reduce the number of disk reads and writes.')
                }]
            }, {
                xtype: 'checkbox',
                name: 'dht-enabled',
                fieldLabel: _('Distributed hash table (DHT).'),
                checked: true,
                boxLabel: _('Enable DHT.')
            }, {
                xtype: 'combo',
                name: 'encryption',
                fieldLabel: _('Encryption'),
                queryMode: 'local',
                store: Ext.create('Ext.data.ArrayStore', {
                    fields: [
                        'value',
                        'text'
                    ],
                    data: [
                        [0, _('Off')],
                        [1, _('Preferred')],
                        [2, _('Forced')]
                    ]
                }),
                displayField: 'text',
                valueField: 'value',
                allowBlank: false,
                editable: false,
                triggerAction: 'all',
                value: 1,
                plugins: [{
                    ptype: 'fieldinfo',
                    text: _('The peer connection encryption mode.')
                }]
            }, {
                xtype: 'checkbox',
                name: 'lazy-bitfield-enabled',
                fieldLabel: _('Lazy Bitfield'),
                checked: true,
                boxLabel: _('May help get around some ISP filtering.')
            }, {
                xtype: 'checkbox',
                name: 'lpd-enabled',
                fieldLabel: _('Local peer discovery (LPD).'),
                checked: false,
                boxLabel: _('Enable LPD.')
            }, {
                xtype: 'combo',
                name: 'message-level',
                fieldLabel: _('Message level'),
                queryMode: 'local',
                store: Ext.create('Ext.data.ArrayStore', {
                    fields: [
                        'value',
                        'text'
                    ],
                    data: [
                        [0, _('None')],
                        [1, _('Error')],
                        [2, _('Info')],
                        [3, _('Debug')]
                    ]
                }),
                displayField: 'text',
                valueField: 'value',
                allowBlank: false,
                editable: false,
                triggerAction: 'all',
                value: 2,
                plugins: [{
                    ptype: 'fieldinfo',
                    text: _('Set verbosity of transmission messages.')
                }]
            }, {
                xtype: 'checkbox',
                name: 'pex-enabled',
                fieldLabel: _('Peer exchange (PEX)'),
                checked: true,
                boxLabel: _('Enable PEX.')
            }, {
                xtype: 'checkbox',
                name: 'scrape-paused-torrents-enabled',
                fieldLabel: _('Scrape paused torrents.'),
                checked: true,
                boxLabel: _('Enable paused torrent scraping.')
            }, {
                xtype: 'checkbox',
                name: 'utp-enabled',
                fieldLabel: _('Micro transport protocol (&micro;TP).'),
                checked: true,
                boxLabel: _('Enable &micro;TP.')
            }]
        }, {
            xtype: 'fieldset',
            title: _('Script to process after torrent finishes'),
            defaults: {
                labelSeparator: ''
            },
            items: [{
                xtype: 'checkbox',
                name: 'script-torrent-done-enabled',
                fieldLabel: _('Enable'),
                checked: false,
                boxLabel: _('Run a script at torrent completion.')
            }, {
                xtype: 'textfield',
                name: 'script-torrent-done-filename',
                fieldLabel: _('Script'),
                allowBlank: true,
                value: '',
                plugins: [{
                    ptype: 'fieldinfo',
                    text: _('Enter path to script.')
                }]
            }]
        }];
    }
});

OMV.WorkspaceManager.registerPanel({
    id: 'settings',
    path: '/service/transmissionbt',
    text: _('Settings'),
    position: 10,
    className: 'OMV.module.admin.service.transmissionbt.Settings'
});
