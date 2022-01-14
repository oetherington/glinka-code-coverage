var data = {lines:[
{"lineNum":"    1","line":"// glinka"},
{"lineNum":"    2","line":"// Copyright (C) 2021-2022 Ollie Etherington"},
{"lineNum":"    3","line":"// <www.etherington.io>"},
{"lineNum":"    4","line":"//"},
{"lineNum":"    5","line":"// This program is free software: you can redistribute it and/or modify"},
{"lineNum":"    6","line":"// it under the terms of the GNU Affero General Public License as published"},
{"lineNum":"    7","line":"// by the Free Software Foundation, either version 3 of the License, or"},
{"lineNum":"    8","line":"// (at your option) any later version."},
{"lineNum":"    9","line":"//"},
{"lineNum":"   10","line":"// This program is distributed in the hope that it will be useful,"},
{"lineNum":"   11","line":"// but WITHOUT ANY WARRANTY; without even the implied warranty of"},
{"lineNum":"   12","line":"// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the"},
{"lineNum":"   13","line":"// GNU Affero General Public License for more details."},
{"lineNum":"   14","line":"//"},
{"lineNum":"   15","line":"// You should have received a copy of the GNU Affero General Public License"},
{"lineNum":"   16","line":"// along with this program. If not, see <http://www.gnu.org/licenses/>."},
{"lineNum":"   17","line":""},
{"lineNum":"   18","line":"const std = @import(\"std\");"},
{"lineNum":"   19","line":"const expectEqualStrings = std.testing.expectEqualStrings;"},
{"lineNum":"   20","line":"const Allocator = std.mem.Allocator;"},
{"lineNum":"   21","line":"const Backend = @import(\"../../common/backend.zig\").Backend;"},
{"lineNum":"   22","line":"const Cursor = @import(\"../../common/cursor.zig\").Cursor;"},
{"lineNum":"   23","line":"const WriteContext = @import(\"../../common/writer.zig\").WriteContext;"},
{"lineNum":"   24","line":"const node = @import(\"../../common/node.zig\");"},
{"lineNum":"   25","line":"const Node = node.Node;"},
{"lineNum":"   26","line":"const NodeType = node.NodeType;"},
{"lineNum":"   27","line":"const exprEmitter = @import(\"expr_emitter.zig\");"},
{"lineNum":"   28","line":"const blockEmitter = @import(\"block_emitter.zig\");"},
{"lineNum":"   29","line":"const declEmitter = @import(\"decl_emitter.zig\");"},
{"lineNum":"   30","line":"const condEmitter = @import(\"cond_emitter.zig\");"},
{"lineNum":"   31","line":"const loopEmitter = @import(\"loop_emitter.zig\");"},
{"lineNum":"   32","line":"const throwEmitter = @import(\"throw_emitter.zig\");"},
{"lineNum":"   33","line":"const functionEmitter = @import(\"function_emitter.zig\");"},
{"lineNum":"   34","line":""},
{"lineNum":"   35","line":"pub const JsBackend = struct {"},
{"lineNum":"   36","line":"    const WriteCtx = WriteContext(.{});"},
{"lineNum":"   37","line":""},
{"lineNum":"   38","line":"    backend: Backend,"},
{"lineNum":"   39","line":"    writeCtx: *WriteCtx,"},
{"lineNum":"   40","line":"    out: WriteCtx.Writer,"},
{"lineNum":"   41","line":""},
{"lineNum":"   42","line":"    pub fn new(alloc: Allocator) !JsBackend {","class":"lineCov","hits":"1","order":"63","possible_hits":"1",},
{"lineNum":"   43","line":"        var ctx = try WriteCtx.new(alloc);","class":"lineCov","hits":"1","order":"64","possible_hits":"1",},
{"lineNum":"   44","line":"        return JsBackend{","class":"lineCov","hits":"2","order":"75","possible_hits":"2",},
{"lineNum":"   45","line":"            .backend = Backend{"},
{"lineNum":"   46","line":"                .callbacks = .{"},
{"lineNum":"   47","line":"                    .prolog = JsBackend.prolog,","class":"lineCov","hits":"1","order":"76","possible_hits":"1",},
{"lineNum":"   48","line":"                    .epilog = JsBackend.epilog,","class":"lineCov","hits":"1","order":"77","possible_hits":"1",},
{"lineNum":"   49","line":"                    .processNode = JsBackend.processNode,","class":"lineCov","hits":"1","order":"78","possible_hits":"1",},
{"lineNum":"   50","line":"                },"},
{"lineNum":"   51","line":"            },"},
{"lineNum":"   52","line":"            .writeCtx = ctx,","class":"lineCov","hits":"1","order":"79","possible_hits":"1",},
{"lineNum":"   53","line":"            .out = ctx.writer(),","class":"lineCov","hits":"1","order":"80","possible_hits":"1",},
{"lineNum":"   54","line":"        };"},
{"lineNum":"   55","line":"    }"},
{"lineNum":"   56","line":""},
{"lineNum":"   57","line":"    pub fn deinit(self: *JsBackend) void {","class":"lineCov","hits":"2","order":"122","possible_hits":"2",},
{"lineNum":"   58","line":"        self.writeCtx.deinit();","class":"lineCov","hits":"1","order":"123","possible_hits":"1",},
{"lineNum":"   59","line":"    }"},
{"lineNum":"   60","line":""},
{"lineNum":"   61","line":"    pub fn toString(self: JsBackend) ![]u8 {","class":"lineCov","hits":"1","order":"103","possible_hits":"1",},
{"lineNum":"   62","line":"        return try self.writeCtx.toString();","class":"lineCov","hits":"1","order":"104","possible_hits":"1",},
{"lineNum":"   63","line":"    }"},
{"lineNum":"   64","line":""},
{"lineNum":"   65","line":"    pub fn freeString(self: JsBackend, str: []u8) void {","class":"lineCov","hits":"1","order":"117","possible_hits":"1",},
{"lineNum":"   66","line":"        return self.writeCtx.freeString(str);","class":"lineCov","hits":"1","order":"118","possible_hits":"1",},
{"lineNum":"   67","line":"    }"},
{"lineNum":"   68","line":""},
{"lineNum":"   69","line":"    fn getSelf(be: *Backend) *JsBackend {","class":"lineCov","hits":"1","order":"89","possible_hits":"1",},
{"lineNum":"   70","line":"        return @fieldParentPtr(JsBackend, \"backend\", be);","class":"lineCov","hits":"1","order":"90","possible_hits":"1",},
{"lineNum":"   71","line":"    }"},
{"lineNum":"   72","line":""},
{"lineNum":"   73","line":"    fn prolog(be: *Backend) Backend.Error!void {","class":"lineCov","hits":"2","order":"87","possible_hits":"2",},
{"lineNum":"   74","line":"        const self = JsBackend.getSelf(be);","class":"lineCov","hits":"1","order":"88","possible_hits":"1",},
{"lineNum":"   75","line":"        try self.out.print(\"// Generated by glinka\\n\", .{});","class":"lineCov","hits":"1","order":"91","possible_hits":"1",},
{"lineNum":"   76","line":"    }"},
{"lineNum":"   77","line":""},
{"lineNum":"   78","line":"    fn epilog(be: *Backend) Backend.Error!void {","class":"lineCov","hits":"2","order":"135","possible_hits":"2",},
{"lineNum":"   79","line":"        const self = JsBackend.getSelf(be);","class":"lineCov","hits":"1","order":"136","possible_hits":"1",},
{"lineNum":"   80","line":"        try self.out.print(\"// End of glinka compilation\", .{});","class":"lineCov","hits":"1","order":"137","possible_hits":"1",},
{"lineNum":"   81","line":"    }"},
{"lineNum":"   82","line":""},
{"lineNum":"   83","line":"    fn processNode(be: *Backend, nd: Node) Backend.Error!void {","class":"lineCov","hits":"2","order":"5069","possible_hits":"2",},
{"lineNum":"   84","line":"        const self = JsBackend.getSelf(be);","class":"lineCov","hits":"1","order":"5070","possible_hits":"1",},
{"lineNum":"   85","line":"        try self.emitNode(nd);","class":"lineCov","hits":"1","order":"5071","possible_hits":"1",},
{"lineNum":"   86","line":"    }"},
{"lineNum":"   87","line":""},
{"lineNum":"   88","line":"    pub fn emitExpr(self: JsBackend, value: Node) Backend.Error!void {","class":"lineCov","hits":"1","order":"5094","possible_hits":"1",},
{"lineNum":"   89","line":"        return try exprEmitter.emitExpr(self, value);","class":"lineCov","hits":"1","order":"5095","possible_hits":"1",},
{"lineNum":"   90","line":"    }"},
{"lineNum":"   91","line":""},
{"lineNum":"   92","line":"    pub fn emitNode(self: *JsBackend, nd: Node) Backend.Error!void {","class":"lineCov","hits":"2","order":"5072","possible_hits":"2",},
{"lineNum":"   93","line":"        switch (nd.data) {","class":"lineCov","hits":"2","order":"5073","possible_hits":"2",},
{"lineNum":"   94","line":"            .Ident,"},
{"lineNum":"   95","line":"            .Int,"},
{"lineNum":"   96","line":"            .String,"},
{"lineNum":"   97","line":"            .Template,"},
{"lineNum":"   98","line":"            .True,"},
{"lineNum":"   99","line":"            .False,"},
{"lineNum":"  100","line":"            .Null,"},
{"lineNum":"  101","line":"            .Undefined,"},
{"lineNum":"  102","line":"            .PrefixOp,"},
{"lineNum":"  103","line":"            .PostfixOp,"},
{"lineNum":"  104","line":"            .BinaryOp,"},
{"lineNum":"  105","line":"            .Ternary,"},
{"lineNum":"  106","line":"            .Call,"},
{"lineNum":"  107","line":"            .Array,"},
{"lineNum":"  108","line":"            .ArrayAccess,"},
{"lineNum":"  109","line":"            .Dot,"},
{"lineNum":"  110","line":"            .Object,"},
{"lineNum":"  111","line":"            => {"},
{"lineNum":"  112","line":"                try self.emitExpr(nd);","class":"lineCov","hits":"1","order":"5093","possible_hits":"1",},
{"lineNum":"  113","line":"                try self.out.print(\";\\n\", .{});","class":"lineCov","hits":"1","order":"5099","possible_hits":"1",},
{"lineNum":"  114","line":"            },"},
{"lineNum":"  115","line":"            .Block => try blockEmitter.emitBlock(self, nd.data.Block.items),","class":"lineCov","hits":"2","order":"5074","possible_hits":"2",},
{"lineNum":"  116","line":"            .Decl => try declEmitter.emitDecl(self, nd.data.Decl),","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  117","line":"            .If => try condEmitter.emitCond(self, nd.data.If),","class":"lineCov","hits":"2","order":"5144","possible_hits":"2",},
{"lineNum":"  118","line":"            .Switch => try condEmitter.emitSwitch(self, nd.data.Switch),","class":"lineCov","hits":"2","order":"5243","possible_hits":"2",},
{"lineNum":"  119","line":"            .For => try loopEmitter.emitFor(self, nd.data.For),","class":"lineCov","hits":"2","order":"5289","possible_hits":"2",},
{"lineNum":"  120","line":"            .While => try loopEmitter.emitWhile(self, nd.data.While),","class":"lineCov","hits":"2","order":"5334","possible_hits":"2",},
{"lineNum":"  121","line":"            .Do => try loopEmitter.emitDo(self, nd.data.Do),","class":"lineCov","hits":"2","order":"5351","possible_hits":"2",},
{"lineNum":"  122","line":"            .Break => try loopEmitter.emitBreak(self, nd.data.Break),","class":"lineCov","hits":"2","order":"5259","possible_hits":"2",},
{"lineNum":"  123","line":"            .Continue => try loopEmitter.emitContinue(self, nd.data.Continue),","class":"lineCov","hits":"2","order":"5376","possible_hits":"2",},
{"lineNum":"  124","line":"            .Throw => try throwEmitter.emitThrow(self, nd.data.Throw),","class":"lineCov","hits":"2","order":"5392","possible_hits":"2",},
{"lineNum":"  125","line":"            .Try => try throwEmitter.emitTry(self, nd.data.Try),","class":"lineCov","hits":"2","order":"5415","possible_hits":"2",},
{"lineNum":"  126","line":"            .Function => try functionEmitter.emitFunc(self, nd.data.Function),","class":"lineCov","hits":"2","order":"5439","possible_hits":"2",},
{"lineNum":"  127","line":"            .Return => try functionEmitter.emitReturn(self, nd.data.Return),","class":"lineCov","hits":"2","order":"5255","possible_hits":"2",},
{"lineNum":"  128","line":"            .Alias => {},"},
{"lineNum":"  129","line":"            .InterfaceType => {},"},
{"lineNum":"  130","line":"            else => std.debug.panic(","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  131","line":"                \"Unhandled node type in JsBackend.processNode: {?}\\n\","},
{"lineNum":"  132","line":"                .{nd.getType()},","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  133","line":"            ),"},
{"lineNum":"  134","line":"        }"},
{"lineNum":"  135","line":"    }"},
{"lineNum":"  136","line":"};"},
{"lineNum":"  137","line":""},
{"lineNum":"  138","line":"test \"JsBackend can emit prolog\" {","class":"lineCov","hits":"3","order":"61","possible_hits":"3",},
{"lineNum":"  139","line":"    var backend = try JsBackend.new(std.testing.allocator);","class":"lineCov","hits":"1","order":"62","possible_hits":"1",},
{"lineNum":"  140","line":"    defer backend.deinit();","class":"linePartCov","hits":"1","order":"121","possible_hits":"4",},
{"lineNum":"  141","line":"    try backend.backend.prolog();","class":"linePartCov","hits":"1","order":"84","possible_hits":"2",},
{"lineNum":"  142","line":"    const str = try backend.toString();","class":"linePartCov","hits":"1","order":"102","possible_hits":"2",},
{"lineNum":"  143","line":"    defer backend.freeString(str);","class":"linePartCov","hits":"1","order":"116","possible_hits":"2",},
{"lineNum":"  144","line":"    try expectEqualStrings(\"// Generated by glinka\\n\", str);","class":"linePartCov","hits":"1","order":"115","possible_hits":"2",},
{"lineNum":"  145","line":"}"},
{"lineNum":"  146","line":""},
{"lineNum":"  147","line":"test \"JsBackend can emit epilog\" {","class":"lineCov","hits":"3","order":"130","possible_hits":"3",},
{"lineNum":"  148","line":"    var backend = try JsBackend.new(std.testing.allocator);","class":"lineCov","hits":"1","order":"131","possible_hits":"1",},
{"lineNum":"  149","line":"    defer backend.deinit();","class":"linePartCov","hits":"1","order":"141","possible_hits":"4",},
{"lineNum":"  150","line":"    try backend.backend.epilog();","class":"linePartCov","hits":"1","order":"132","possible_hits":"2",},
{"lineNum":"  151","line":"    const str = try backend.toString();","class":"linePartCov","hits":"1","order":"138","possible_hits":"2",},
{"lineNum":"  152","line":"    defer backend.freeString(str);","class":"linePartCov","hits":"1","order":"140","possible_hits":"2",},
{"lineNum":"  153","line":"    try expectEqualStrings(\"// End of glinka compilation\", str);","class":"linePartCov","hits":"1","order":"139","possible_hits":"2",},
{"lineNum":"  154","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-01-14 09:28:45", "instrumented" : 60, "covered" : 57,};
var merged_data = [];
